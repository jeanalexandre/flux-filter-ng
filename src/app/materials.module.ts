import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule, MatMenuModule,
  MatTableModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {NgModule} from "@angular/core";

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
  ],
})
export class MaterialsModule { }
