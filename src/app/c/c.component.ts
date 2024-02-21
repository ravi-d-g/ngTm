import { Component, ViewChild } from '@angular/core';
import { CalendarService, Day } from '../calendar.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, SlicePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { BookingComponent } from '../booking/booking.component';

@Component({
  selector: 'app-c',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDialogModule, MatDialogTitle,
    MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,
    MatMenuModule,
    SlicePipe,
    CommonModule],
  templateUrl: './c.component.html',
  styleUrl: './c.component.scss'
})
export class CComponent {

  public monthDays: Day[] = [];

  public monthNumber!: number;
  public year!: number;

  public weekDaysName: any = [];

  today!: any

  constructor(public calendarCreator: CalendarService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.today = this.calendarCreator.getDate()
    this.setMonthDays(this.calendarCreator.getCurrentMonth());

    this.weekDaysName.push("Mo");
    this.weekDaysName.push("Tu");
    this.weekDaysName.push("We");
    this.weekDaysName.push("Th");
    this.weekDaysName.push("Fr");
    this.weekDaysName.push("Sa");
    this.weekDaysName.push("Su");
  }

  onNextMonth(): void {
    this.monthNumber++;

    if (this.monthNumber == 12) {
      this.monthNumber = 0;
      this.year++;
    }

    this.setMonthDays(this.calendarCreator.getMonth(this.monthNumber, this.year));
  }

  onPreviousMonth(): void {
    this.monthNumber--;

    if (this.monthNumber < 1) {
      this.monthNumber = 11;
      this.year--;
    }

    this.setMonthDays(this.calendarCreator.getMonth(this.monthNumber, this.year));
  }

  newList: any = []
  private setMonthDays(days: Day[]): void {
    let tmpList = []
    for (let index = 0; index < days.length; index++) {
      const element = days[index];
      tmpList.push(element)

    }


    this.newList = this.listToMatrix(tmpList, 7)
    this.monthDays = days;
    this.monthNumber = this.monthDays[0].monthIndex;
    this.year = this.monthDays[0].year;
  }



  listToMatrix(list: Day[], elementsPerSubArray: number) {

    var matrix: any = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {

      if (i % elementsPerSubArray === 0) {
        k++;
        matrix[k] = [];
      }

      matrix[k].push(list[i]);

    }

    return matrix;
  }










  clickItem(item: Day, isEdit: boolean) {
    console.log('isEdit', isEdit)
    console.log('item   ===>', item)

    let timeBooking = {
      title: "Test",
      date: "",
      time: "11:30pm"
    }



    let selectedDate = `${item.month}/${item.number}/${item.year}`

    let date = new Date()
    let hour = date.getHours();
    // let minutes = date.getMinutes();



    let sendObj = {
      title: 'Test',
      date: new Date(selectedDate),
      // time: `${hour}:${minutes}`,
      desc: 'Testing'

    }
    let minutes = 5
    let getRoundedDate = (minutes: any, d = new Date()) => { let ms = 1000 * 60 * minutes; return new Date(Math.round(d.getTime() / ms) * ms); }
    console.log('getRoundedDate ===>', getRoundedDate)
    const dialogRef = this.dialog.open(BookingComponent, { data: sendObj, restoreFocus: false });
    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe((result) => {
      console.log('result', result)
      if (result) {

        item.timeBooking.push(result)
      }

    });

  }




}
