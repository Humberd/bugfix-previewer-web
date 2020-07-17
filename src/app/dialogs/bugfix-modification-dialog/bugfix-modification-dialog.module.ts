import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugfixModificationDialogComponent } from './bugfix-modification-dialog.component';

@NgModule({
  declarations: [BugfixModificationDialogComponent],
  imports: [
    CommonModule,
  ],
})
export class BugfixModificationDialogModule {
  static getComponent(): typeof BugfixModificationDialogComponent {
    return BugfixModificationDialogComponent;
  }
}
