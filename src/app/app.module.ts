import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './contents/chart/chart.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { PatientComponent } from './contents/patient/patient.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PesertaComponent } from './peserta/peserta.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfilComponent } from './dashboard/profil/profil.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponentComponent } from './dashboard/dashboard-component/dashboard-component.component';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { AngularNotificationModule } from 'angular-notification-alert';
// import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    SidebarComponent,
    NavbarComponent,
    PatientComponent,
    HomeComponent,
    FooterComponent,
    PesertaComponent,
    LoginComponent,
    ProfilComponent,
    SidenavComponent,
    DashboardComponentComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgApexchartsModule,
    HttpClientModule,
    FormsModule,
    AngularNotificationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
