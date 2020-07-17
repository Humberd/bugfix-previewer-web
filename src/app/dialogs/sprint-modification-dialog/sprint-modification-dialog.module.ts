import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintModificationDialogComponent } from './sprint-modification-dialog.component';

@NgModule({
  declarations: [SprintModificationDialogComponent],
  imports: [
    CommonModule,
  ],
})
export class SprintModificationDialogModule {
  static getComponent(): typeof SprintModificationDialogComponent {
    return SprintModificationDialogComponent;
  }
}
