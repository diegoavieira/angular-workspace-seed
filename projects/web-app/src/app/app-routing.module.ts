import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/client/client.module').then((m) => m.ClientModule)
  },
  {
    path: 'support',
    canActivate: [AuthGuard],
    data: {
      roles: ['support']
    },
    loadChildren: () => import('./pages/support/support.module').then((m) => m.SupportModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
