import { Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';
import { PanelGuard } from './core/guards/panel.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), canActivate: [PanelGuard]},
  { path: 'inicio', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), canActivate: [LoginGuard]},
  { path: 'gestion', loadComponent: () => import('./pages/buttons-menu/buttons-menu.component').then(m => m.ButtonsMenuComponent), canActivate: [LoginGuard]},
  { path: 'gestion/crear', loadComponent: () => import('./pages/create-manangement/create-manangement.component').then(m => m.CreateManangementComponent), canActivate: [LoginGuard] },
  { path: 'gestion/historial', loadComponent: () => import('./pages/history-manangement/history-manangement.component').then(m => m.HistoryManangementComponent), canActivate: [LoginGuard] },
  { path: 'categoria/:cat_id', loadComponent: () => import('./pages/expenses/expenses.component').then(m => m.ExpensesComponent), canActivate: [LoginGuard]},
  { path: 'categoria', loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent), canActivate: [LoginGuard]},


  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];
