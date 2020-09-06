import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import {Plugins, StatusBarStyle} from '@capacitor/core' 
import { AppRoutingModule} from './app-routing.module'
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inicio',
      url: '/folder/Inicio',
      icon: 'mail'
    },
    {
      title: 'Datos',
      url: '/contact',
      icon: 'paper-plane'
    },
    {
      title: 'Logeos Actuales',
      url: '/folder/Logeos',
      icon: 'heart'
    },
    {
      title: 'Archivos',
      url: '/folder/Datos',
      icon: 'archive'
    },
    {
      title: 'Fotos',
      url: '/folder/Datos',
      icon: 'camera'
    },
    {
      title: 'Chats',
      url: '/folder/Datos',
      icon: 'chatbubbles'
    },

  ];
  public labels = [];

  constructor(
    private platform: Platform,
    private route:Router,
    private route2:ActivatedRoute
  ) {
    // this.route.navigate(['/home'], );
    this.initializeApp();
  }

  async initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;
    try {
      await SplashScreen.hide();
      await StatusBar.setStyle({ style: StatusBarStyle.Light });
      if (this.platform.is('android')) {
        StatusBar.setBackgroundColor({ color: '#CDCDCD' });
      }
    } catch (err) {
      console.log('This is normal in a browser', err);
    }
  }

  ngOnInit() {
    //  this.route.navigate(['/home'] );
    // let url= this.route2.snapshot.paramMap.get("url2");
    // if(url=="login"){
    //   this.route.navigate(['/login'] );
    // }
    // if(url=="home"){
    //    this.route.navigate(['/home'] );
    // }
  } 
}
