import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KzCalendarComponent} from './kz-calendar/kz-calendar.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [KzCalendarComponent],
  exports: [
    KzCalendarComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SharedModule { }
