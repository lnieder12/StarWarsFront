import { Component, ViewChild } from '@angular/core';
import { Soldier } from '../interfaces/soldier';
import { GameService } from '../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { SoldiersService } from '../services/soldiers.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-create-selected-soldiers',
  templateUrl: './create-selected-soldiers.component.html',
  styleUrls: ['./create-selected-soldiers.component.css', '../../styles.css']
})
export class CreateSelectedSoldiersComponent {

  soldiers: Soldier[] = [];

  gameRebels: Soldier[] = [];

  gameEmpires: Soldier[] = [];

  soldierInfo?: Soldier;

  onIndex: any = null;

  @ViewChild(CdkVirtualScrollViewport, {static: false}) scrollView!: CdkVirtualScrollViewport;

  constructor(
    private gameService: GameService,
    private soldierService: SoldiersService,
    private route: ActivatedRoute
  ) { }


  getSoldiers(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.soldierService.getAll()
      .subscribe(sld => {
        this.soldiers = sld;
        console.log(this.soldiers);
      });
  }

  enter(i: number, soldier: Soldier): void {
    this.onIndex = i;
    this.soldierInfo = soldier;
  }

  leave(): void {
    this.onIndex = null;
  }

  addToGame(soldier: Soldier) {
    this.removeFromSoldiers(soldier);
    if (soldier.soldierType === "Rebel") {
      this.gameRebels.push(soldier);
      this.gameRebels = [...this.gameRebels];
    }
    else {
      this.gameEmpires = [soldier, ...this.gameEmpires];
    }
  }

  removeFromSoldiers(soldier: Soldier): void {
    const index = this.soldiers.indexOf(soldier);
    if (index > -1)
      this.soldiers.splice(index, 1);
    this.soldiers = [...this.soldiers];
  }

  filter(): void {
    
  }

  removeRebelFromGame(reb: Soldier): void {
    const index = this.gameRebels.indexOf(reb);
    if (index > -1)
      this.gameRebels.splice(index, 1);
    this.gameRebels = [...this.gameRebels];
    this.soldiers = [reb, ...this.soldiers];
  }

  removeEmpireFromGame(emp: Soldier): void {
    const index = this.gameEmpires.indexOf(emp);
    if (index > -1)
      this.gameEmpires.splice(index, 1);
    this.gameEmpires = [...this.gameEmpires];
    this.soldiers = [emp, ...this.soldiers];
  }

  ngOnInit(): void {
    this.getSoldiers();
  }

}
