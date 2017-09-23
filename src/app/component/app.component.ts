import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top" menu></nav><router-outlet></router-outlet>`,
})
export class AppComponent  { name = 'Angular'; }
