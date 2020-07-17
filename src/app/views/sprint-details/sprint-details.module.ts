import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintDetailsComponent } from './sprint-details.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';

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
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
  ],
})
export class SprintDetailsModule {
}
