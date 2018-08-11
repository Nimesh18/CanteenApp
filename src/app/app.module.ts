import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { CanteenComponent } from './canteen/canteen.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { OrderComponent } from './admin/order/order.component';
import { EmployeeComponent } from './admin/employee/employee.component';
import { MealComponent } from './admin/meal/meal.component';
import { CanteenSeverApiService } from './server-api/canteen-sever-api.service';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'canteen', component: CanteenComponent },
  { path: 'homepage', component: HomepageComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'order',
        component: OrderComponent
      },
      {
        path: 'employee',
        component: EmployeeComponent
      },
      {
        path: 'meal',
        component: MealComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    CanteenComponent,
    HomepageComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    MealComponent,
    EmployeeComponent,
    OrderComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [CanteenSeverApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
