import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  @Input() soldiers: number = 0;

  @Input() empires: number = 0;

  createGame(): void {
    if(this.soldiers && this.empires)
      console.log(`Game created ! ${this.soldiers} soldiers & ${this.empires} empires !`);
  }

}
