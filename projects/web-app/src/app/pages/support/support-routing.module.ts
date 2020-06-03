import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportComponent } from './support.component';

const routes: Routes = [
  {
    path: '',
    component: SupportComponent,
    canActivate: [],
    children: [
      { path: '', redirectTo: 'parents', pathMatch: 'full' },
      {
        path: 'parents',
        loadChildren: () => import('./parents/parents.module').then((m) => m.ParentsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule {}
