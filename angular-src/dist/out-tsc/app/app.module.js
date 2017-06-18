var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { ProductComponent } from './components/products/product.component';
import { ProductService } from "./services/product.service";
import { ProductItemComponent } from './components/products/product-item.component';
import { DeleteComponent } from './components/products/CRUD/delete/delete.component';
import { CreateComponent } from './components/products/CRUD/create/create.component';
import { UpdateComponent } from './components/products/CRUD/update/update.component';
import { SearchComponent } from './components/products/CRUD/search/search.component';
import { FooterComponent } from './components/footer/footer.component';
import { ShopsMapComponent } from './components/shops-map/shops-map.component';
import { GooglMapService } from "./services/google-maps/google-map.service";
import { AgmCoreModule } from "angular2-google-maps/core";
var appRoutes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
    { path: 'products/delete/:serial', component: DeleteComponent },
    { path: 'products/update/:serial', component: UpdateComponent },
    { path: 'products/create', component: CreateComponent },
    { path: 'products/search', component: SearchComponent },
    { path: 'shops-map', component: ShopsMapComponent },
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            NavbarComponent,
            LoginComponent,
            RegisterComponent,
            HomeComponent,
            DashboardComponent,
            ProfileComponent,
            ProductComponent,
            ProductItemComponent,
            ProductItemComponent,
            DeleteComponent,
            UpdateComponent,
            CreateComponent,
            SearchComponent,
            FooterComponent,
            AboutComponent,
            ShopsMapComponent,
        ],
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            RouterModule.forRoot(appRoutes),
            FlashMessagesModule,
            ReactiveFormsModule,
            AgmCoreModule.forRoot({
                apiKey: 'AIzaSyCjUe7lrUWfZ8IWRGdOAshBbTJUO5EBibU'
            }),
        ],
        providers: [ValidateService, AuthService, AuthGuard, ProductService, GooglMapService],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=C:/Users/Lioran/WebstormProjects/SupermarketProject/angular-src/src/app/app.module.js.map