import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogConfig } from '../model/confirm-dialog-config';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {

  constructor(private matDialog: MatDialog) {
  }

  async open(data: ConfirmDialogConfig) {
    const module = await import('../confirm-dialog.module').then(m => m.ConfirmDialogModule);
    const component = module.getComponent();

    return this.matDialog.open(component, {
      data,
    });
  }
}
