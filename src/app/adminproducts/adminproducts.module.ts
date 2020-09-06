import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminproductsPageRoutingModule } from './adminproducts-routing.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { AdminproductsPage } from './adminproducts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminproductsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdminproductsPage]
})
export class AdminproductsPageModule {}
