import { Component, Input } from '@angular/core';

import { Round } from '../round';
import { ActivatedRoute } from '@angular/router';
import { RoundService } from '../round.service';

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.css']
})
export class RoundsComponent {

  @Input() rounds?: Round[];

  constructor(
    private route: ActivatedRoute,
    private roundService: RoundService
  ) {}

  getRounds(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.roundService.getRounds(id)
      .subscribe(rounds => this.rounds = rounds);
  }

  ngOnInit():void {
    this.getRounds();
  }

}
