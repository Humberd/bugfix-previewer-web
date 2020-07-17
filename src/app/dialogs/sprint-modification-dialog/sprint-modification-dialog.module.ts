import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintModificationDialogComponent } from './sprint-modification-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FieldErrorsModule } from '../../common/field-errors/field-errors.module';

@NgModule({
  declarations: [SprintModificationDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FieldErrorsModule,
  ],
})
export class SprintModificationDialogModule {
  static getComponent(): typeof SprintModificationDialogComponent {
    return SprintModificationDialogComponent;
  }
}
