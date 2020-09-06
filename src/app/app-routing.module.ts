import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service'
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'folder/:id',
    canActivate:[AuthGuardService],
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'contact',
    canActivate:[AuthGuardService],
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
     
  {
    path: 'adminproducts',
     canActivate:[AuthGuardService],
    loadChildren: () => import('./adminproducts/adminproducts.module').then( m => m.AdminproductsPageModule)
  },
  {
    path: 'catalogos',
    canActivate:[AuthGuardService],
    loadChildren: () => import('./catalogos/catalogos.module').then( m => m.CatalogosPageModule)
  },
  {
    path: 'dashboard',
    canActivate:[AuthGuardService],
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'admin', 
    canActivate:[AuthGuardService],
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'adminpreventas',
    loadChildren: () => import('./adminpreventas/adminpreventas.module').then( m => m.AdminpreventasPageModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./eventos/eventos.module').then( m => m.EventosPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
