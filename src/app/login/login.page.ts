import { Component, OnInit } from '@angular/core';

import {servicios} from '../services/services'
import {  ReactiveFormsModule } from '@angular/forms';
import { FormsModule, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
 
  constructor(private serv:servicios , public formBuilder: FormBuilder, private route:Router) { 
    this.loginForm = formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9.%-]+@[A-Za-z0-9.%-]+\\.[a-z]{2,3}')
      ])),
      password: ['', Validators.required]
  });
  }

  ngOnInit() {
    localStorage.removeItem("token");
  }
  login() {
    var dts={
      "email":this.loginForm.value.email,
      "password":this.loginForm.value.password,
    }
    this.serv.sendLogin(dts).then((res)=>{
    if(res!==undefined){
      localStorage.setItem("token",res.user.refreshToken);
      this.route.navigateByUrl('/catalogos');
    }else{
      alert("Verifique sus datos de ingreso.")
    }
     
    });
  }
}
