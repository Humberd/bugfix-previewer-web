import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugfixModificationDialogComponent } from './bugfix-modification-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FieldErrorsModule } from '../../common/field-errors/field-errors.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BugfixModificationDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FieldErrorsModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class BugfixModificationDialogModule {
  static getComponent(): typeof BugfixModificationDialogComponent {
    return BugfixModificationDialogComponent;
  }
}
