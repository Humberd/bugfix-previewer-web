import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/sprints',
  },
  {
    path: 'sprints',
    loadChildren: () => import('./views/sprints/sprints.module').then(m => m.SprintsModule),
  },
  {
    path: 'sprints/:id',
    loadChildren: () => import('./views/sprint-details/sprint-details.module').then(m => m.SprintDetailsModule),
  },
  {
    path: 'sprints/:id/demo',
    loadChildren: () => import('./views/demo/demo.module').then(m => m.DemoModule),
  },
  {
    path: '**',
    redirectTo: '/sprints'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    onSameUrlNavigation: 'reload',
    initialNavigation: 'enabled',
    relativeLinkResolution: 'corrected',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
