import { DashboardComponentComponent } from './dashboard/dashboard-component/dashboard-component.component';
import { ProfilComponent } from './dashboard/profil/profil.component';
import { LoginComponent } from './auth/login/login.component';
import { PesertaComponent } from './peserta/peserta.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth/auth.guard';
// import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { OnAuthGuard } from './service/auth/on-auth.guard';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { DashboardAdminComponent } from './dashboard/dashboard-admin/dashboard-admin.component';
import { TestComponent } from './dashboard/test/test.component';
import { UsersComponent } from './dashboard/tables/users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardAdminComponent },
      { path: 'users', component: UsersComponent },
      { path: 'test', component: TestComponent },
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
