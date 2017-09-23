import { Component } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: '[menu]',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  constructor(private router: Router) {}

  // noinspection JSUnusedGlobalSymbols
  includeDayMenu(): boolean {
    console.log('URL: ' + this.router.url);
    return this.router.url.indexOf('/day/') >= 0;
  }
}
