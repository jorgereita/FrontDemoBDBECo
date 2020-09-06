import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Routes, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import { AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { HomePageModule } from './home/home.module';
import { LoginPageModule } from './login/login.module';

const routes:Routes =[
  {path:"home",redirectTo:"home"},
  {path:"login",redirectTo:"login"},
]
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    RouterModule.forRoot(routes),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule, 
    FormsModule,
    InfiniteScrollModule,
    ReactiveFormsModule  ],
  providers: [
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
