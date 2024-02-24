import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('../login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
