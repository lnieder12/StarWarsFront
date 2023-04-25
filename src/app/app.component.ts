import { Component } from '@angular/core';
import { ClarityIcons, bellIcon, checkIcon, timesIcon } from '@cds/core/icon';
import '@cds/core/icon/register.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StarWars';
  constructor () {
    ClarityIcons.addIcons(bellIcon, checkIcon, timesIcon);
  }
}
