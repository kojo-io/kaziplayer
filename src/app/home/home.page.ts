import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  mindate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  maxdate = new Date(2100, 1, 1);
  constructor() {}
  getDate(event) {
    console.log(event);
  }
}
