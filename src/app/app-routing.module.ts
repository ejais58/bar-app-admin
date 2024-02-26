import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './feature/auth/guard/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./feature/auth/auth.module').then(m => m.AuthModule)
  },
  { 
    path: '', 
    redirectTo: '/auth/login', 
    pathMatch: 'full' 
  },
  {
    path: 'home',
    loadChildren: () => import('./feature/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
