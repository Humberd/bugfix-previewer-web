import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class SprintModificationDialogService {

  constructor(private matDialog: MatDialog) {
  }

  async openCreate() {
    const module = await import('../sprint-modification-dialog.module').then(m => m.SprintModificationDialogModule);
    const component = module.getComponent();

    return this.matDialog.open(component);
  }

  async openUpdate() {
    const module = await import('../sprint-modification-dialog.module').then(m => m.SprintModificationDialogModule);
    const component = module.getComponent();

    return this.matDialog.open(component);
  }
}
