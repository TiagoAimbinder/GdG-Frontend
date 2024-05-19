import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'inicio', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'gestion', loadComponent: () => import('./pages/buttons-menu/buttons-menu.component').then(m => m.ButtonsMenuComponent) },
  { path: 'gestion/crear', loadComponent: () => import('./pages/create-manangement/create-manangement.component').then(m => m.CreateManangementComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },


  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];
