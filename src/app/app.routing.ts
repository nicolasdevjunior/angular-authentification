import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { Role } from './_models';
import { RegisterComponent } from './pages/register/register.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ServerUnavailableComponent } from './pages/server-unavailable/server-unavailable.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: HomeComponent,
        // pathMatch: 'full'
    },
    { 
        path: 'serverUnavailable',
        component: ServerUnavailableComponent,
    },  
    {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileComponent,
    },   
    {
        path: 'formation',
        canActivate: [AuthGuard],
        // data: { roles: [Role.Admin,Role.SuperAdmin] },
        loadChildren: () => import("./pages/formation/formation.module").then(m => m.FormationModule) 
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    }, 
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRouting {
    
}
