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
import { ProfilComponent } from './profil/profil.component';
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
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
