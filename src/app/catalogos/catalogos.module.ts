import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalogosPageRoutingModule } from './catalogos-routing.module';
import {  ReactiveFormsModule } from '@angular/forms';

import { CatalogosPage } from './catalogos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CatalogosPage]
})
export class CatalogosPageModule {}
