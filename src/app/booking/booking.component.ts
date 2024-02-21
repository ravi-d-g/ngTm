import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import {

  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { ViewChild } from '@angular/core';
import { DateTime } from 'ts-luxon';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-booking',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatTimepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,

  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit, OnChanges {


  formControlTitle: FormControl = new FormControl('');
  formControlItem: FormControl = new FormControl('');
  formControlDate: FormControl = new FormControl('');
  formControlDesc: FormControl = new FormControl('');

  ngOnChanges() {

  }

  constructor(public dialogRef: MatDialogRef<BookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {

  }

  ngOnInit() {
    console.log('this.data', this.data)
    this.formControlTitle.setValue(this.data.title);
    this.formControlItem.setValue(this.data.time);
    this.formControlDate.setValue(this.data.date);
    this.formControlDesc.setValue(this.data.desc);
  }


  maxTime: DateTime = DateTime.local().set({
    hour: 16,
  });

  minTime: DateTime = DateTime.local().set({
    hour: 14,
  });

  required: boolean = !1;

  @ViewChild('timepicker') timepicker: any;
  @ViewChild('picker') picker: any;

  /**
   * Lets the user click on the icon in the input.
   */
  openFromIcon(timepicker: { open: () => void }) {
    if (!this.formControlItem.disabled) {
      timepicker.open();
    }
  }

  /**
   * Function to clear FormControl's value, called from the HTML template using the clear button
   *
   * @param $event - The Event's data object
   */
  onClear($event: Event) {
    this.formControlItem.setValue(null);
  }

  onSaveClick(): void {
    this.data.title = this.formControlTitle.value;
    this.data.time = this.formControlItem.value;
    this.data.date = this.formControlDate.value;
    this.data.desc = this.formControlDesc.value;
    this.dialogRef.close(this.data);
  }

}
