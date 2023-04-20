import { Component,Input } from '@angular/core';

import { Round } from '../../interfaces/round';
import { RoundService } from '../../services/round.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-round-detail',
  templateUrl: './round-detail.component.html',
  styleUrls: ['./round-detail.component.css']
})
export class RoundDetailComponent {

  @Input() round?: Round;

  constructor(
    private route: ActivatedRoute,
    private roundService: RoundService
  ) {}

  getRound(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.roundService.getRound(id)
      .subscribe(round => this.round = round);
  }

  ngOnInit(): void {
    this.getRound();
  }

}
