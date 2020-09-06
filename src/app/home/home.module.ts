import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ModalCarritoComponent } from '../modal-carrito/modal-carrito.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll'
// import { ScrollableDirective } from '../scrollable.directive'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    InfiniteScrollModule
  ],
  declarations: [HomePage,ModalCarritoComponent],
  entryComponents:[ModalCarritoComponent]
})
export class HomePageModule {}
 