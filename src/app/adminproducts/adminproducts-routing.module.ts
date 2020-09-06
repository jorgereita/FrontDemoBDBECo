import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminproductsPage } from './adminproducts.page';

const routes: Routes = [
  {
    path: '',
    component: AdminproductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminproductsPageRoutingModule {}
