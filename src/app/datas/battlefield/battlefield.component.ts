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

  damage?: { coords: Coords, damage: number, nb: number };

  round?: Round;

  clockAnimate: number = 0;

  keepFighting: boolean = false;

  drawLine(line: Line): void {
    if (this.clockAnimate % 3 == 0)
      line.width--;
    this.ctx.beginPath();
    this.ctx.strokeStyle = line.color;
    this.ctx.lineWidth = line.width;
    this.ctx.moveTo(line.x0, line.y0);
    this.ctx.lineTo(line.x1, line.y1);
    this.ctx.stroke();
    if (line.width == 0) {
      const index = this.lines.indexOf(line);
      if (index > -1)
        this.lines.splice(index, 1);
    }
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

  redrawAll(): void {
    this.ctx.clearRect(0, 0, this.battlefied.width, this.battlefied.height);
    this.drawSoldiers();
    this.drawLines();
    this.drawDamage();
  }

  drawSoldiers(): void {
    if (this.round) {
      if (this.round.attacker.soldierType === "Rebel") {
        this.nameOverSoldier(this.rebels[0], this.round.attacker.name);
        this.nameOverSoldier(this.empires[0], this.round.defender.name);
      }
      else {
        this.nameOverSoldier(this.rebels[0], this.round.defender.name);
        this.nameOverSoldier(this.empires[0], this.round.attacker.name);
      }
    }
    this.rebels.forEach(rb => this.drawCircle(rb, "blue"));
    this.empires.forEach(emp => this.drawCircle(emp, "red"));
  }

  drawLines(): void {
    this.lines.forEach(line => this.drawLine(line));
  }

  drawDamage(): void {
    if (this.damage)
      this.damageOverSoldier(this.damage.coords, this.damage.damage)
  }

  nameOverSoldier(sld: Coords, name: string): void {
    this.ctx.beginPath();
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "black";
    this.ctx.font = "10px Arial";
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
      this.rebels.forEach(rb => {
        if (bool)
          bool = this.farEnough(sd, rb)
      });
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
      this.empires.forEach(emp => {
        if (bool)
          bool = this.farEnough(sd, emp)
      });
    }
    this.empires.push(sd);
    return sd;
  }

  farEnough(one: Coords, two: Coords): boolean {
    var pow = Math.pow(two.x - one.x, 2) - Math.pow(two.y - one.y, 2);
    var dist = Math.floor(Math.sqrt(Math.abs(pow)));
    return dist >= 20;
  }

  rebelShoot(reb: Coords, emp: Coords): void {
    this.soldierShoot(emp, reb, "blue", 0);
  }

  empireShoot(emp: Coords, reb: Coords): void {
    this.soldierShoot(emp, reb, "red", 0);
  }


  soldierShoot(a: Coords, b: Coords, color: string, damage: number): void {
    var line = {} as Line;
    line.x0 = a.x;
    line.y0 = a.y;
    line.x1 = b.x;
    line.y1 = b.y;
    line.color = color;
    line.width = 7;
    this.lines.push(line);
    this.drawLine(line);
    if (this.round)
      this.damageOverSoldier(b, damage);

  }

  damageOverSoldier(sld: Coords, damage: number): void {
    if (!this.damage) {
      const temp = {} as { coords: Coords, damage: number, nb: number };
      temp.coords = sld;
      temp.damage = damage;
      temp.nb = 20;
      this.damage = temp;
    }
    else {
      this.damage.nb--;
    }
    this.ctx.beginPath();
    this.ctx.font = "20px Arial black";
    this.ctx.fillStyle = `rgba(0, 0, 0, ${this.damage.nb / 20})`;
    this.ctx.fillText(damage.toString(), sld.x + 20, sld.y - (20 - this.damage.nb) * 3);
    if (this.damage.nb == 0)
      this.damage = undefined;
  }

  randomShoot(): void {
    var reb = this.rebels[this.randomNumber(0, this.rebels.length)];
    var emp = this.empires[this.randomNumber(0, this.empires.length)];

    if (this.randomNumber(0, 100) >= 50) {
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
    this.clockAnimate = 0;
    this.round = round;
    this.rebels = [];
    this.empires = [];
    this.lines = [];
    this.ctx.clearRect(0, 0, this.battlefied.width, this.battlefied.height);
    var attacker!: Coords;
    var defender!: Coords;
    var color: string;
    if (round.attacker.soldierType === "Rebel") {
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
      this.soldierShoot(attacker, defender, color, round.damage);

      while (this.clockAnimate < 20) {
        await delay(100);
        this.clockAnimate++;
        this.redrawAll();
      }
      this.clockAnimate = 0;
      this.drawSoldiers();


    })();
  }

  startMultipleFights(nbFights: number): void {
    var nb = nbFights;
    if (nb > 20)
      nb = 20;
    this.keepFighting = true;
    this.multipleFights(nb);
  }

  stopMultipleFights(): void {
    this.keepFighting = false;
  }

  multipleFights(nb: number) {
    this.rebels = [];
    this.empires = [];
    this.lines = [];
    this.damage = undefined;
    this.round = undefined;
    this.ctx.clearRect(0, 0, this.battlefied.width, this.battlefied.height);
    for (let i = 0; i < nb; i++) {
      this.randomPlaceEmpire();
      this.randomPlaceRebel();
    }
    this.drawSoldiers();
    (async () => {
      (async () => {
        var endAnimation = 0;
        while (this.keepFighting || endAnimation < 40) {
          await delay(100);
          if(!this.keepFighting)
            endAnimation++;
          this.clockAnimate++;
          this.redrawAll();
        }
      })()
      while (this.keepFighting) {
        const rnd = this.randomNumber(500, 800);
        await delay(rnd);
        this.randomShoot();
      }
    })()
  }

  ngOnInit(): void {
    this.ctx = this.myCanvas.nativeElement.getContext('2d');
  }

}
