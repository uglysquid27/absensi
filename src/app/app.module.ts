import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { NgIdleModule } from '@ng-idle/core';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { DashboardAdminComponent } from './dashboard/dashboard-admin/dashboard-admin.component';
import { TestComponent } from './dashboard/test/test.component';
import { UserStatusComponent } from './dashboard/tables/user-status/user-status.component';
import { UsersComponent } from './dashboard/tables/users/users.component';
import { InstitutionsComponent } from './dashboard/tables/institutions/institutions.component';
import { EditComponent } from './dashboard/tables/users/edit/edit.component';
import { EditComponent as StatusEditComponent } from './dashboard/tables/user-status/edit/edit.component';
import { EditComponent as InstEditComponent } from './dashboard/tables/institutions/edit/edit.component';
import { ActivityAdminComponent } from './dashboard/activity-admin/activity-admin.component';
import { CreateComponent } from './dashboard/tables/users/create/create.component';
import { DepartmentsComponent } from './dashboard/tables/departments/departments.component';
import { BanksComponent } from './dashboard/tables/banks/banks.component';
import { CreateComponent as ActivityAddComponent } from './dashboard/activity-admin/create/create.component';
import { CreateComponent as StatusAddComponent } from './dashboard/tables/user-status/create/create.component';
import { CreateComponent as InstAddComponent } from './dashboard/tables/institutions/create/create.component';
import { CreateComponent as DepAddComponent } from './dashboard/tables/departments/create/create.component';
import { IndexActivityUserComponent } from './dashboard/activity-user/index-activity-user/index-activity-user.component';
import { CreateActivityUserComponent } from './dashboard/activity-user/create-activity-user/create-activity-user.component';
import { UpdateActivityUserComponent } from './dashboard/activity-user/update-activity-user/update-activity-user.component';
import { CKEditorModule } from 'ckeditor4-angular';
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
    DashboardComponent,
    DashboardAdminComponent,
    TestComponent,
    UserStatusComponent,
    UsersComponent,
    InstitutionsComponent,
    EditComponent,
    ActivityAdminComponent,
    CreateComponent,
    DepartmentsComponent,
    BanksComponent,
    StatusEditComponent,
    ActivityAddComponent,
    IndexActivityUserComponent,
    CreateActivityUserComponent,
    UpdateActivityUserComponent,
    StatusAddComponent,
    InstEditComponent,
    InstAddComponent,
    DepAddComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgApexchartsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    CKEditorModule,
    NgIdleKeepaliveModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
