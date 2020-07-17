import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintDetailsComponent } from './sprint-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SprintDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SprintDetailsComponent,
      },
    ]),
  ],
})
export class SprintDetailsModule {
}
