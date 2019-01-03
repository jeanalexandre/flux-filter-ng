import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import {Application} from "../models/application.model";

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: Application
  ) {}

  clearBar(): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  delete() {
    this.bottomSheetRef.dismiss( {
      message: 'delete',
      data: this.data
    });
  }

  ngOnInit() {
  }
}
