import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KzCalendarComponent} from './kz-calendar/kz-calendar.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
