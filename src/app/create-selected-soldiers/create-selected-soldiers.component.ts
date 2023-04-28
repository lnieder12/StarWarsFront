import { Component, Input, ViewChild } from '@angular/core';
import { Soldier } from '../interfaces/soldier';
import { GameService } from '../services/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SoldiersService } from '../services/soldiers.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NbValidator, NumberValidator } from '../numberValidator';

@Component({
  selector: 'app-create-selected-soldiers',
  templateUrl: './create-selected-soldiers.component.html',
  styleUrls: ['./create-selected-soldiers.component.css', '../../styles.css']
})
export class CreateSelectedSoldiersComponent {

  @Input() inputFilter: string = "";

  radioFilter: string = "";

  soldiers: Soldier[] = [];

  gameRebels: Soldier[] = [];

  gameEmpires: Soldier[] = [];

  filteredSoldiers: Soldier[] = [];

  soldierInfo?: Soldier;

  onIndex: any = null;

  onScroll: any = null;

  error: boolean = false;

  regexHealth: RegExp = /^(\d+ < )?(hp|health) [<>] \d+$/i;

  regexAttack: RegExp = /^(\d+ < )?(atk|attack) [<>] \d+$/i

  @ViewChild(CdkVirtualScrollViewport, { static: false }) scrollView!: CdkVirtualScrollViewport;

  constructor(
    private gameService: GameService,
    private soldierService: SoldiersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  createGame(a: any): void {
    const nbRound = a.target.nbRound.value;
    console.log(nbRound);
    this.gameService.createSelectedSoldiersGame(this.gameRebels, this.gameEmpires, Number(a.target.nbRound.value))
      .subscribe(game => {
        this.router.navigateByUrl(`game/${game.id}`);
      });
  }

  validate(x: any) {
    this.error = !NbValidator(x.target.value);
  }

  radioFilterSoldiers(filter: string, bool: any): void {
    if (bool.target.value) {

      this.radioFilter = filter;
      this.setFilter();

    }
  }

  setFilter(): void {
    var input = this.inputFilter.trim().toLowerCase();
    if(this.regexHealth.test(input)) {
      this.filteredSoldiers = this.filterHealth(input);
    }
    else if(this.regexAttack.test(input)) {
      this.filteredSoldiers = this.filterAttack(input);
    }
    else {
      this.filteredSoldiers = this.filterRadio().filter(sld => sld.name.toLowerCase().startsWith(input));
    }
  }

  filterHealth(input: string): Soldier[] {
    const args = input.split(" ");
    if(!isNaN(Number(args[0])))
    {
      if(args[3] === "<")
      {
        return this.filterRadio().filter(sld => sld.health > Number(args[0]) && sld.health < Number(args[args.length-1]));
      }
      return this.filterRadio().filter(sld => sld.health > Number(args[0]) && sld.health > Number(args[args.length-1]));
    }
    if(args[1] === "<")
    {
      return this.filterRadio().filter(sld => sld.health < Number(args[args.length-1]));
    }
    else
    return this.filterRadio().filter(sld => sld.health > Number(args[args.length-1]));
  }

  filterAttack(input: string): Soldier[] {
    const args = input.split(" ");
    if(!isNaN(Number(args[0])))
    {
      if(args[3] === "<")
      {
        return this.filterRadio().filter(sld => sld.attack > Number(args[0]) && sld.attack < Number(args[args.length-1]));
      }
      return this.filterRadio().filter(sld => sld.attack > Number(args[0]) && sld.attack > Number(args[args.length-1]));
    }
    if(args[1] === "<")
    {
      return this.filterRadio().filter(sld => sld.attack < Number(args[args.length-1]));
    }
    else
    return this.filterRadio().filter(sld => sld.attack > Number(args[args.length-1]));
  }

  filterRadio(): Soldier[] {
    switch (this.radioFilter) {
      case 'rebels':
        return this.soldiers.filter(sld => sld.soldierType === "Rebel");
      case 'empires':
        return this.soldiers.filter(sld => sld.soldierType === "Empire");
      default:
        return this.soldiers;
    }
  }

  getSoldiers(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.soldierService.getAll()
      .subscribe(sld => {
        this.soldiers = sld;
        this.filteredSoldiers = sld;
      });
  }

  enter(i: number, soldier: Soldier, onScroll: string): void {
    this.onIndex = i;
    this.soldierInfo = soldier;
    this.onScroll = onScroll;
  }

  leave(): void {
    this.onIndex = null;
    this.onScroll = null;
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
    console.log("remove", soldier);
    const index = this.soldiers.indexOf(soldier);
    if (index > -1)
      this.soldiers.splice(index, 1);
    this.setFilter();
  }


  removeRebelFromGame(reb: Soldier): void {
    const index = this.gameRebels.indexOf(reb);
    if (index > -1)
      this.gameRebels.splice(index, 1);
    this.gameRebels = [...this.gameRebels];
    this.soldiers = [reb, ...this.soldiers];
    this.setFilter();
  }

  removeEmpireFromGame(emp: Soldier): void {
    const index = this.gameEmpires.indexOf(emp);
    if (index > -1)
      this.gameEmpires.splice(index, 1);
    this.gameEmpires = [...this.gameEmpires];
    this.soldiers = [emp, ...this.soldiers];
    this.setFilter();
  }

  ngOnInit(): void {
    this.getSoldiers();
  }

}
