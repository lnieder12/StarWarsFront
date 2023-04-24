import { Component, Input } from '@angular/core';

import { Game } from '../interfaces/game';
import { GameService } from '../services/game.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-outlet',
  templateUrl: './game-outlet.component.html',
  styleUrls: ['./game-outlet.component.css', '../../styles.css']
})
export class GameOutletComponent {
  
  @Input() game?: Game;

  error :boolean = false;

  constructor (
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getGame(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.gameService.getGame(id)
      .subscribe(game => this.game = game,
        error => {
          console.log("error");
          this.error = true;
          new Promise(res => setTimeout(() => {
          this.redirect();
        }, 3000));
      });
  }

  redirect(): void {
    this.router.navigateByUrl("");
  }

  ngOnInit(): void {
    this.getGame();
  }

}
