import { AuthService } from "./services/auth.service";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NaviagtionBarComponent } from "./component/naviagtion-bar/naviagtion-bar.component";
import { HomeComponent } from "./component/home/home.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { RegisterComponent } from "./component/register/register.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    NaviagtionBarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpModule],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
