import { Component, Input, ViewChild } from '@angular/core';
import { Soldier, equals } from '../interfaces/soldier';
import { GameService } from '../services/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SoldiersService } from '../services/soldiers.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NbValidator, NumberValidator } from '../numberValidator';
import { combineLatest, forkJoin } from 'rxjs';

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

  overScrollView: any = null;

  error: boolean = false;

  regexHealth: RegExp = /^(\d+ < )?(hp|health) [<>] \d+$/i;

  regexAttack: RegExp = /^(\d+ < )?(atk|attack) [<>] \d+$/i

  private firstSub: boolean = true;

  @ViewChild(CdkVirtualScrollViewport, { static: false }) scrollView!: CdkVirtualScrollViewport;

  constructor(
    private gameService: GameService,
    private soldierService: SoldiersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    combineLatest({
      rebels: this.gameService.rebelsSubject,
      empires: this.gameService.empiresSubject
    }).subscribe(results => {
      this.gameRebels = [...results.rebels];
      this.gameEmpires = [...results.empires];
      if(this.firstSub)
        this.getSoldiers(results.empires, results.rebels);
      this.firstSub = false;
    });
    // this.gameService.rebelsSubject
    //   .subscribe(rebels => {
    //     console.log(this.soldiers);
    //     this.gameRebels = [...rebels];
    // });
    // this.gameService.empiresSubject
    //   .subscribe(empires => {
    //     console.log(this.soldiers);
    //     this.gameEmpires = [...empires];
    // });
  }

  createGame(a: any): void {
    const nbRound = a.target.nbRound.value;
    this.gameService.createSelectedSoldiersGame(this.gameRebels, this.gameEmpires, Number(nbRound))
      .subscribe(game => {
        this.router.navigateByUrl(`game/${game.id}`);
      },
        error => console.log(error));
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
    if (this.regexHealth.test(input)) {
      this.filteredSoldiers = this.filterHealth(input);
    }
    else if (this.regexAttack.test(input)) {
      this.filteredSoldiers = this.filterAttack(input);
    }
    else {
      this.filteredSoldiers = this.filterRadio().filter(sld => sld.name.toLowerCase().startsWith(input));
    }
  }

  filterHealth(input: string): Soldier[] {
    const args = input.split(" ");
    if (!isNaN(Number(args[0]))) {
      if (args[3] === "<") {
        return this.filterRadio().filter(sld => sld.maxHealth > Number(args[0]) && sld.maxHealth < Number(args[args.length - 1]));
      }
      return this.filterRadio().filter(sld => sld.maxHealth > Number(args[0]) && sld.maxHealth > Number(args[args.length - 1]));
    }
    if (args[1] === "<") {
      return this.filterRadio().filter(sld => sld.maxHealth < Number(args[args.length - 1]));
    }
    else
      return this.filterRadio().filter(sld => sld.maxHealth > Number(args[args.length - 1]));
  }

  filterAttack(input: string): Soldier[] {
    const args = input.split(" ");
    if (!isNaN(Number(args[0]))) {
      if (args[3] === "<") {
        return this.filterRadio().filter(sld => sld.attack > Number(args[0]) && sld.attack < Number(args[args.length - 1]));
      }
      return this.filterRadio().filter(sld => sld.attack > Number(args[0]) && sld.attack > Number(args[args.length - 1]));
    }
    if (args[1] === "<") {
      return this.filterRadio().filter(sld => sld.attack < Number(args[args.length - 1]));
    }
    else
      return this.filterRadio().filter(sld => sld.attack > Number(args[args.length - 1]));
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

  getSoldiers(emps: Soldier[], rebs: Soldier[]): void {
    console.log(emps);
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.soldierService.getAll()
      .subscribe(sld => {
        var list = sld.filter(sld => {
          var bool = true;
          emps.forEach(emp =>
            {
              if(bool)
                bool = !equals(emp, sld)
            });
          if(bool)
            rebs.forEach(reb => {
              if(bool)
                bool = !equals(reb, sld);
            })
          return bool;
          });
        console.log(list);
        this.soldiers = list;
        this.filteredSoldiers = list;
      });
  }

  enter(i: number, soldier: Soldier, onScroll: string): void {
    this.onIndex = i;
    this.soldierInfo = soldier;
    this.overScrollView = onScroll;
  }

  leave(): void {
    this.onIndex = null;
    this.overScrollView = null;
  }

  addToGame(soldier: Soldier) {
    this.removeFromSoldiers(soldier);
    if (soldier.soldierType === "Rebel") {
      this.gameService.addToRebels(soldier);
    }
    else {
      this.gameService.addToEmpires(soldier);
    }
  }

  removeFromSoldiers(soldier: Soldier): void {
    const index = this.soldiers.indexOf(soldier);
    if (index > -1) {
      this.soldiers.splice(index, 1);
    }
    this.setFilter();
  }

  removeRebelFromGame(reb: Soldier): void {

    this.gameService.removeFromRebels(reb);

    this.soldiers = [reb, ...this.soldiers];
    this.setFilter();
  }

  removeEmpireFromGame(emp: Soldier): void {

    this.gameService.removeFromEmpires(emp);

    this.soldiers = [emp, ...this.soldiers];
    this.setFilter();
  }

  ngOnInit(): void {
  }

}
