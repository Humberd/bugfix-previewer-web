import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SprintModificationDialogData } from '../model/sprint-modification-dialog-data';

@Injectable({
  providedIn: 'root',
})
export class SprintModificationDialogService {

  constructor(private matDialog: MatDialog) {
  }

  async openCreate() {
    const module = await import('../sprint-modification-dialog.module').then(m => m.SprintModificationDialogModule);
    const component = module.getComponent();

    return this.matDialog.open(component, {
      width: '400px',
    });
  }

  async openUpdate(data: SprintModificationDialogData) {
    const module = await import('../sprint-modification-dialog.module').then(m => m.SprintModificationDialogModule);
    const component = module.getComponent();

    return this.matDialog.open(component, {
      data,
      width: '400px',
    });
  }
}
