import { Component, ElementRef, ViewChild } from '@angular/core';

import { Coords } from 'src/app/interfaces/coords';
import { Line } from 'src/app/interfaces/line';
import { Round } from 'src/app/interfaces/round';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.css']
})
export class BattlefieldComponent {

  @ViewChild('battlefield', { static: true }) myCanvas!: ElementRef;

  battlefied = { width: 600, height: 300 };

  ctx!: CanvasRenderingContext2D;

  rebels: Coords[] = [];

  empires: Coords[] = [];

  lines: Line[] = [];


  drawLine(line: Line): void {
    this.ctx.beginPath();
    this.ctx.strokeStyle = line.color;
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(line.x0, line.y0);
    this.ctx.lineTo(line.x1, line.y1);
    this.ctx.stroke();
  }

  drawCircle(coords: Coords, color: string): void {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 1;
    this.ctx.arc(coords.x, coords.y, 10, 0, 2 * Math.PI);
    this.ctx.fill()
    this.ctx.stroke();
  }

  drawSoldiers(): void {
    this.rebels.forEach(rb => this.drawCircle(rb, "blue"));
    this.empires.forEach(emp => this.drawCircle(emp, "red"));
  }

  drawLines(): void {
    this.lines.forEach(line => this.drawLine(line));
  }

  nameOverSoldier(sld: Coords, name: string): void {
    this.ctx.beginPath();
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(name, sld.x, sld.y - 15);
  }

  randomPlaceRebel(): Coords {
    var bool = false;
    var sd!: Coords;
    while (!bool) {
      const x = this.randomNumber(30, 120);
      const y = this.randomNumber(25, 275);
      sd = { x, y };

      bool = true;
      this.rebels.forEach(rb => bool = this.farEnough(sd, rb));
    }
    this.rebels.push(sd);
    return sd;
  }

  randomPlaceEmpire(): Coords {
    var bool = false;
    var sd!: Coords;
    while (!bool) {
      const x = this.randomNumber(480, 570);
      const y = this.randomNumber(25, 275);
      sd = { x, y };

      bool = true;
      this.empires.forEach(emp => bool = this.farEnough(sd, emp));
    }
    this.empires.push(sd);
    return sd;
  }

  farEnough(one: Coords, two: Coords): boolean {
    var dist = Math.sqrt(Math.pow(two.x - one.x, 2) - Math.pow(two.y - one.y, 2));
    return dist >= 30;
  }

  rebelShoot(reb: Coords, emp: Coords): void {
    this.soldierShoot(emp, reb, "blue");
  }

  empireShoot(emp: Coords, reb: Coords): void {
    this.soldierShoot(emp, reb, "red");
  }

  soldierShoot(a: Coords, b: Coords, color: string): void {
    var line = {} as Line;
    line.x0 = a.x;
    line.y0 = a.y;
    line.x1 = b.x;
    line.y1 = b.y;
    line.color = color;
    this.lines.push(line);
    this.drawLine(line);
  }

  randomShoot(): void {
    var reb = this.rebels[this.randomNumber(0, this.rebels.length)];
    var emp = this.empires[this.randomNumber(0, this.empires.length)];

    if (Math.round(Math.random())) {
      this.rebelShoot(reb, emp);
    }
    else {
      this.empireShoot(emp, reb);
    }
  }

  randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }



  singleFight(round: Round): void {
    this.rebels = [];
    this.empires = [];
    this.lines = [];
    this.ctx.clearRect(0, 0, this.battlefied.width, this.battlefied.height);
    var attacker!: Coords;
    var defender!: Coords;
    var color: string;
    if (round.attacker.name.includes("REB")) {
      attacker = this.randomPlaceRebel();
      defender = this.randomPlaceEmpire();
      color = "blue";
    }
    else {
      attacker = this.randomPlaceEmpire();
      defender = this.randomPlaceRebel();
      color = "red";
    }
    this.drawSoldiers();
    this.nameOverSoldier(attacker, round.attacker.name);
    this.nameOverSoldier(defender, round.defender.name);

    (async () => {
      await delay(1000);
      this.soldierShoot(attacker, defender, color);
    })();
  }

  ngOnInit(): void {
    this.ctx = this.myCanvas.nativeElement.getContext('2d');
  }

}
