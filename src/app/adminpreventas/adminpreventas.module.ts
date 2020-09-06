import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminpreventasPageRoutingModule } from './adminpreventas-routing.module';

import { AdminpreventasPage } from './adminpreventas.page';
import {  ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminpreventasPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdminpreventasPage]
})
export class AdminpreventasPageModule {}
