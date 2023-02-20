import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { ProfilComponent } from './profil/profil.component';
import { LoginComponent } from './auth/login/login.component';
import { PesertaComponent } from './peserta/peserta.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'peserta', component: PesertaComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profil', component: ProfilComponent},
  { path: 'dashboard', component: DashboardComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
