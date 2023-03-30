import { IndexActivityUserComponent } from './dashboard/activity-user/index-activity-user/index-activity-user.component';
import { BanksComponent } from './dashboard/tables/banks/banks.component';
import { DepartmentsComponent } from './dashboard/tables/departments/departments.component';
import { InstitutionsComponent } from './dashboard/tables/institutions/institutions.component';
import { DashboardComponentComponent } from './dashboard/dashboard-component/dashboard-component.component';
import { ProfilComponent } from './dashboard/profil/profil.component';
import { LoginComponent } from './auth/login/login.component';
import { PesertaComponent } from './peserta/peserta.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth/auth.guard';
// import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { OnAuthGuard } from './service/auth/on-auth.guard';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { DashboardAdminComponent } from './dashboard/dashboard-admin/dashboard-admin.component';
import { TestComponent } from './dashboard/test/test.component';
import { UsersComponent } from './dashboard/tables/users/users.component';
import { UserStatusComponent } from './dashboard/tables/user-status/user-status.component';
import { EditComponent as UserEditComponent } from './dashboard/tables/users/edit/edit.component';
import { EditComponent as InstEditComponent } from './dashboard/tables/institutions/edit/edit.component';
import { CreateComponent as UserAddComponent } from './dashboard/tables/users/create/create.component';
import { CreateComponent as StatusAddComponent } from './dashboard/tables/user-status/create/create.component';
import { CreateComponent as InstAddComponent } from './dashboard/tables/institutions/create/create.component';
import { CreateComponent as DepAddComponent } from './dashboard/tables/departments/create/create.component';
import { EditComponent as StatusEditComponent } from './dashboard/tables/user-status/edit/edit.component';
import { ActivityAdminComponent } from './dashboard/activity-admin/activity-admin.component';
import { CreateComponent as ActivityAddComponent } from './dashboard/activity-admin/create/create.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardAdminComponent },
      { path: 'users', component: UsersComponent },
      { path: 'user-status', component: UserStatusComponent },
      { path: 'user-status/edit/:id', component: StatusEditComponent },
      { path: 'user-status/add', component: StatusAddComponent},
      { path: 'institutions', component: InstitutionsComponent },
      { path: 'institutions/edit/:id', component: InstEditComponent},
      { path: 'institutions/add', component: InstAddComponent},
      { path: 'departments', component: DepartmentsComponent },
      { path: 'departments/add', component: DepAddComponent},
      { path: 'banks', component: BanksComponent },
      { path: 'users/edit/:id', component: UserEditComponent },
      { path: 'users/add', component: UserAddComponent },
      { path: 'activity', component: ActivityAdminComponent },
      { path: 'activity/create', component: ActivityAddComponent },
      { path: 'myActivity', component: IndexActivityUserComponent },
    ],
  },
  { path: 'peserta', component: PesertaComponent },
  { path: 'pkl', component: PesertaComponent },
  { path: 'magang', component: PesertaComponent },
  { path: 'intern', component: PesertaComponent },
  { path: 'login', component: LoginComponent, canActivate: [OnAuthGuard] },
  { path: 'profil/:id', component: ProfilComponent },
  { path: 'dashboard/:id', component: DashboardComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
export const routingComponent = [DashboardComponentComponent, ProfilComponent];
