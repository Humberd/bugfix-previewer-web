import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DemoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DemoComponent,
      },
    ]),
    MatIconModule,
    MatButtonModule,
  ],
})
export class DemoModule {
}
