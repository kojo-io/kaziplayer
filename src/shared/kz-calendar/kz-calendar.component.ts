import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-kz-calendar',
  templateUrl: './kz-calendar.component.html',
  styleUrls: ['./kz-calendar.component.scss'],
})
export class KzCalendarComponent implements OnInit {
  // this is the default date initializer
  // it is an input because we allow it to accept changes from the user
  @Input() kzDate: Date = new Date();
  @Input() useUTC = false;
  // this emit any changes to the selected date to the user
  @Output() kzDateChange = new EventEmitter<Date>();
  // this sets the maximum date for the calendar
  @Input() maxDate: Date = new Date(2100, 1, 1);
  // this set the minimum date for the calendar
  @Input() minDate: Date = new Date() ;
  // this is an array for the list of years
  years: Array<any> = [];
  // this holds the selected year
  selectedYear: any;
  // this holds the selected month
  month: any;
  // this holds the month count
  monthCount = 0;
  // this holds the list of days
  AllDays: string[] = [
    'SUN',
    'MON',
    'TUES',
    'WED',
    'THURS',
    'FRI',
    'SAT'
  ];
  // this holds the list of months
  AllMonths: any[] = [
    {
      name: 'JANUARY'
    },
    {
      name: 'FEBRUARY'
    },
    {
      name: 'MARCH'
    },
    {
      name: 'APRIL'
    },
    {
      name: 'MAY'
    },
    {
      name: 'JUNE'
    },
    {
      name: 'JULY'
    },
    {
      name: 'AUGUST'
    },
    {
      name: 'SEPTEMBER'
    },
    {
      name: 'OCTOBER'
    },
    {
      name: 'NOVEMBER'
    },
    {
      name: 'DECEMBER'
    }
  ];
  // this holds all dates in a selected month
  AllDates: Array<any> = [];
  // configuration for the slider for the dates
  // the break points are meant for other screen sizes
  slidesOpts = {
    slidesPerView: 3,
    spaceBetween: 5,
    breakpoints: {
      576: {
        slidesPerView: 3,
        spaceBetween: 5,
      },
      768: {
        slidesPerView: 6,
        spaceBetween: 5,
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 5,
      },
      1200: {
        slidesPerView: 9,
        spaceBetween: 5,
      },
    }
  };

  constructor() { }

  ngOnInit() {
    this.GetYears();
    this.monthCount = this.kzDate.getMonth();
    this.GetDefaultCalendar();
  }

  GetYears() {
    for (let i = this.minDate.getFullYear(); i <= this.maxDate.getFullYear(); i++) {
      this.years.push({year: i, selected: false});
    }
  }

  GetCalendar(date) {
    this.kzDate = new Date(date);
    if (this.useUTC) {
      this.AllDates = this.DaysInMonthUTC(this.kzDate.getUTCFullYear(), this.kzDate.getUTCMonth());
    } else {
      this.AllDates = this.DaysInMonth(this.kzDate.getFullYear(), this.kzDate.getMonth());
    }
  }

  GetDefaultCalendar() {
    if (this.useUTC) {
      this.AllDates = this.DaysInMonthUTC(this.kzDate.getUTCFullYear(), this.kzDate.getUTCMonth());
    } else {
      this.AllDates = this.DaysInMonth(this.kzDate.getFullYear(), this.kzDate.getMonth());
    }

    this.AllMonths.forEach(u => u.selected = false);
    this.AllMonths[this.kzDate.getMonth()].selected = true;
    this.month = this.AllMonths[this.kzDate.getMonth()].name;
    this.selectedYear = this.kzDate.getFullYear();
    this.years.forEach(u => u.selected = false);
    this.years.find(u => u.year === this.kzDate.getFullYear()).selected = true;
  }

  private DaysInMonth(year, month): any {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push({date: new Date(date)});
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  private DaysInMonthUTC(year, month): any {
    const date = new Date(Date.UTC(year, month, 1));
    const days = [];
    while (date.getUTCMonth() === month) {
      days.push({date: new Date(date), class: null});
      date.setDate(date.getUTCDate() + 1);
    }
    return days;
  }

  // get name of selected month
  GetMonth(date: Date): any {
    return this.AllMonths[date.getMonth()].name;
  }

  GetMonthUTC(date: Date): any {
    return this.AllMonths[date.getUTCMonth()].name;
  }

  GetUTCDay(date: Date): any {
    return this.AllDays[date.getUTCDay()];
  }

  // get the name of selected day
  GetDay(date: Date): any {
    return this.AllDays[date.getDay()];
  }

  // get the date of the selected date
  GetDate(date: Date): any {
    return date.getDate();
  }

  GetUTCDate(date: Date): any {
    return date.getUTCDate();
  }

  GetPreviousMonth() {
    this.monthCount --;
    if (this.monthCount === -1) {
      this.monthCount = 11;
      console.log(this.monthCount);
      this.kzDate = new Date(this.kzDate.getFullYear() - 1, 11, 1);
    } else {
      this.kzDate.setMonth(this.kzDate.getMonth() - 1);
    }
    this.GetDefaultCalendar();
  }

  GetNextMonth() {
    this.monthCount ++;
    if (this.monthCount === 12) {
      this.monthCount = 0;
      console.log(this.monthCount);
      this.kzDate = new Date(this.kzDate.getFullYear() + 1, 0, 1);
    } else {
      this.kzDate.setMonth(this.kzDate.getMonth() + 1);
    }
    this.GetDefaultCalendar();
  }

  calendarMonthChange(event) {
    this.kzDate.setMonth(this.AllMonths.findIndex(u => u.name === event.detail.value));
    this.GetDefaultCalendar();
  }

  calendarYearChange(event) {
    this.kzDate = new Date(event.detail.value, this.kzDate.getMonth(), 1);
    this.GetDefaultCalendar();
  }

  onCalendarChange(date, index: Element) {
    const allEle = document.getElementsByClassName('datec');
    for (let i = 0; i < allEle.length; i++) {
      allEle.item(i).classList.remove('selected');
    }
    index.classList.add('selected');
    this.kzDateChange.emit(date);
  }

}
