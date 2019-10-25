import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './components/main/index/index.component';
import { JobComponent } from './components/job/job.component';

import { LoginComponent } from './components/main/login/login.component';
import { RegisterComponent } from './components/main/register/register.component';
import { AuthGuard } from './auth.guard';
import { UserComponent } from './components/user/user.component';
import { EditProfileComponent } from './components/user/edit-profile/edit-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditRecruiterComponent } from './components/recruiter/edit-recruiter/edit-recruiter.component'

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'findjob', component: JobComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
<<<<<<< HEAD
  { path: 'displayjobs', component: UserComponent }, // landing page for job seekers
  { path: 'editprofile', component: EditProfileComponent }, // edit profile page for job seekers
  { path: "edit_recruiter", component: EditRecruiterComponent},
  { path: 'jobdetails', component: JobComponent }, //  job details page for job seekers
=======
  { path: 'displayjobs', component: UserComponent, canActivate: [AuthGuard] }, // landing page for job seekers
  { path: 'editprofile', component: EditProfileComponent, canActivate: [AuthGuard] }, // edit profile page for job seekers
  { path: 'jobdetails', component: JobComponent, canActivate: [AuthGuard] }, //  job details page for job seekers
>>>>>>> a2f2fbc70bb9d36a9daf9f2ef0ec39cd2f6d2da7
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
