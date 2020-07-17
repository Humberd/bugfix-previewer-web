import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BugfixModificationDialogData } from '../model/bugfix-modification-dialog-data';

@Injectable({
  providedIn: 'root'
})
export class BugfixModificationDialogService {

  constructor(private matDialog: MatDialog) {
  }

  async openCreate(data: BugfixModificationDialogData) {
    const module = await import('../bugfix-modification-dialog.module').then(m => m.BugfixModificationDialogModule);
    const component = module.getComponent();

    return this.matDialog.open(component, {
      data,
      width: '700px',
    });
  }

  async openUpdate(data: BugfixModificationDialogData) {
    const module = await import('../bugfix-modification-dialog.module').then(m => m.BugfixModificationDialogModule);
    const component = module.getComponent();

    return this.matDialog.open(component, {
      data,
      width: '700px',
    });
  }
}
