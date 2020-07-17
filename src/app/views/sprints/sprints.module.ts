import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintsComponent } from './sprints.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SprintsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SprintsComponent,
      },
    ]),
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
})
export class SprintsModule { }
