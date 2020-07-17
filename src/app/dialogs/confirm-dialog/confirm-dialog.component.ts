import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogConfig } from './model/confirm-dialog-config';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: ConfirmDialogConfig,
    private matDialogRef: MatDialogRef<ConfirmDialogComponent>,
    private snackBar: MatSnackBar,
  ) {
  }

  confirm() {
    this.dialogData.action()
      .subscribe({
        next: result => this.matDialogRef.close(result),
        error: err => this.snackBar.open(err.message || err),
      });
  }

}
