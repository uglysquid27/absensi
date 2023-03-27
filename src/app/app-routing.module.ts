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
import { CreateComponent as UserAddComponent } from './dashboard/tables/users/create/create.component';
import { ActivityAdminComponent } from './dashboard/activity-admin/activity-admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardAdminComponent },
      { path: 'users', component: UsersComponent },
      { path: 'user-status', component: UserStatusComponent},
      { path: 'institutions', component: InstitutionsComponent},
      { path: 'departments', component: DepartmentsComponent},
      { path: 'banks', component: BanksComponent},
      { path: 'users/edit/:id', component: UserEditComponent },
      { path: 'users/add', component: UserAddComponent},
      { path: 'activity', component: ActivityAdminComponent },
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
export class AppRoutingModule {}
export const routingComponent = [DashboardComponentComponent, ProfilComponent];
