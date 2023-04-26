import { Component, Input, ViewChild } from '@angular/core';

import { Game } from '../interfaces/game';
import { GameService } from '../services/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Round } from '../interfaces/round';

@Component({
  selector: 'app-game-outlet',
  templateUrl: './game-outlet.component.html',
  styleUrls: ['./game-outlet.component.css', '../../styles.css']
})
export class GameOutletComponent {

  @Input() game?: Game;

  rounds: Round[] = [];

  error: boolean = false;

  showNotif: boolean = false;

  newNotif: boolean = false;

  onIndex: any = null;

  numTab: number = 1;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) {


    this.gameService.roundSubject.subscribe(rounds => {
      if(!this.showNotif)
        this.newNotif = true;
      this.rounds = [...this.rounds, ...rounds];
    });
  }

  enter(i: number): void {
    this.onIndex = i;
  }

  leave(): void {
    this.onIndex = null;
  }

  removeNotif(round: Round): void {
    
    const index = this.rounds.indexOf(round);
    if(index > -1)
      this.rounds.splice(index, 1);
    this.rounds = [...this.rounds]
  }

  removeAllNotif(): void {
    this.rounds = [];
  }

  getGame(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.gameService.getGame(id)
      .subscribe(game => this.game = game,
        error => {
          this.error = true;
          new Promise(res => setTimeout(() => {
            this.redirect();
          }, 3000));
        });
  }

  openNotifs(): void {
    this.newNotif = false;
    this.showNotif = !this.showNotif;
  }

  redirect(): void {
    this.router.navigateByUrl("");
  }

  setTab(nb: number): void {
    this.numTab = nb;
  }

  ngOnInit(): void {
    this.getGame();
  }

}
