import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './components/main/index/index.component';
import { JobComponent } from './components/job/job.component';

import { LoginComponent } from './components/main/login/login.component';
import { RegisterComponent } from './components/main/register/register.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'findjob', component: JobComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
