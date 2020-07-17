import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldErrorsComponent } from './components/field-errors/field-errors.component';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [FieldErrorsComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
  ],
  exports: [FieldErrorsComponent]
})
export class FieldErrorsModule { }
