import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminpreventasPage } from './adminpreventas.page';

const routes: Routes = [
  {
    path: '',
    component: AdminpreventasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminpreventasPageRoutingModule {}
