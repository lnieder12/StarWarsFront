import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Soldier } from '../../interfaces/soldier';
import { NbValidator } from '../../numberValidator';
import { GameService } from '../../services/game.service';
import { SoldierService } from '../../services/soldiers.service';

@Component({
  selector: 'app-create-selected-soldiers',
  templateUrl: './create-selected-soldiers.component.html',
  styleUrls: ['./create-selected-soldiers.component.css', '../../../styles.css']
})
export class CreateSelectedSoldiersComponent {

  @Input() inputFilter: string = "";

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.ctrlPressed = event.ctrlKey;
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    this.ctrlPressed = false;
  }

  ctrlPressed: boolean = false;

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
    private soldierService: SoldierService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    combineLatest({
      rebels: this.gameService.rebelsSubject,
      empires: this.gameService.empiresSubject
    }).subscribe(results => {
      this.gameRebels = [...results.rebels];
      this.gameEmpires = [...results.empires];
      if (this.firstSub)
        this.getSoldiers(results.empires, results.rebels);
      this.firstSub = false;
    });
  }

  createGame(a: any): void {
    const nbRound = a.target.nbRound.value;
    this.gameService.createSelectedSoldiersGame(this.gameRebels, this.gameEmpires, Number(nbRound))
      .subscribe(game => {
        this.gameService.empiresSubject.next([]);
        this.gameService.rebelsSubject.next([]);
        this.router.navigateByUrl(`game/${game.id}`);
      },
        error => console.log(error));
  }

  validate(x: any) {
    this.error = !NbValidator(x.target.value);
  }

  radioFilterSoldiers(filter: string, bool: any): void {
    if (bool.target.value) {
      this.scrollView.scrollToIndex(0);
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
      this.filteredSoldiers = this.soldierFilteredRadio().filter(sld => sld.name.toLowerCase().includes(input));
    }
  }

  filterHealth(input: string): Soldier[] {
    const args = input.split(" ");
    if (!isNaN(Number(args[0]))) {
      if (args[3] === "<") {
        return this.soldierFilteredRadio().filter(sld => sld.maxHealth > Number(args[0]) && sld.maxHealth < Number(args[args.length - 1]));
      }
      return this.soldierFilteredRadio().filter(sld => sld.maxHealth > Number(args[0]) && sld.maxHealth > Number(args[args.length - 1]));
    }
    if (args[1] === "<") {
      return this.soldierFilteredRadio().filter(sld => sld.maxHealth < Number(args[args.length - 1]));
    }
    else
      return this.soldierFilteredRadio().filter(sld => sld.maxHealth > Number(args[args.length - 1]));
  }

  filterAttack(input: string): Soldier[] {
    const args = input.split(" ");
    if (!isNaN(Number(args[0]))) {
      if (args[3] === "<") {
        return this.soldierFilteredRadio().filter(sld => sld.attack > Number(args[0]) && sld.attack < Number(args[args.length - 1]));
      }
      return this.soldierFilteredRadio().filter(sld => sld.attack > Number(args[0]) && sld.attack > Number(args[args.length - 1]));
    }
    if (args[1] === "<") {
      return this.soldierFilteredRadio().filter(sld => sld.attack < Number(args[args.length - 1]));
    }
    else
      return this.soldierFilteredRadio().filter(sld => sld.attack > Number(args[args.length - 1]));
  }

  soldierFilteredRadio(): Soldier[] {
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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.soldierService.getAll()
      .subscribe(sld => {
        var list = sld.filter(sld => {
          var bool = this.gameService.contains(sld);
          if (bool) {
            this.gameService.modify(sld);
          }
          return !bool;
        });
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

  addToGame(soldier: Soldier): void {
    if (this.ctrlPressed) {
      this.goToSoldierInfo(soldier.id);
    }
    else {
      this.removeFromSoldiers(soldier);
      if (soldier.soldierType === "Rebel") {
        this.gameService.addToRebels(soldier);
      }
      else {
        this.gameService.addToEmpires(soldier);
      }
    }
  }

  removeFromGame(sld: Soldier): void {
    if (this.ctrlPressed) {
      this.goToSoldierInfo(sld.id);
    }
    else {
      if (sld.soldierType == "Rebel") {
        this.gameService.removeFromRebels(sld);
      }
      else {
        this.gameService.removeFromEmpires(sld);
      }

      this.soldiers = [sld, ...this.soldiers];
      this.setFilter();
    }
  }

  removeFromSoldiers(soldier: Soldier): void {
    const index = this.soldiers.indexOf(soldier);
    if (index > -1) {
      this.soldiers.splice(index, 1);
    }
    this.setFilter();
  }

  goToSoldierInfo(id: number): void {
    this.router.navigateByUrl(`soldier/${id}`);
  }

  ngOnInit(): void {
  }

}
