import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import {Plugins, StatusBarStyle} from '@capacitor/core' 
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  tab
  constructor(  public formBuilder: FormBuilder,private route:Router) {

  }
  ngOnInit() {
   
  }
  goCategorias(){
    this.route.navigateByUrl('/catalogos');
  }
}
