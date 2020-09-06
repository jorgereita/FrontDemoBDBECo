import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { servicios } from '../services/services';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  
  public productForm: FormGroup;
  public productForm2: FormGroup;
  
  todos
  catalogos
  secciones
  tab = '0'
  constructor(
    private serv: servicios, 
    public formBuilder: FormBuilder,
    private route:Router,
    public alertController: AlertController,
    public toastController: ToastController,
    ) {
    this.productForm = formBuilder.group({
      nombre: ['', Validators.required],

    });
    this.productForm2 = formBuilder.group({
      nombre: ['', Validators.required],

    });
  }
  async presentToast(e) {
    const toast = await this.toastController.create({
      message: e,
      color:'success',
      duration: 2000
    });
    toast.present();
  }
  async presentAlertConfirm(item) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atención !',
      message: 'Desea borrar el banner ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
             
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.borrarBanner(item)
          }
        }
      ]
    });

    await alert.present();
  }
  async presentAlertConfirm2(item) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atención !',
      message: 'Desea borrar <b>'+item.nombre+'</b> ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
             
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.borrar2(item)
          }
        }
      ]
    });

    await alert.present();
  }
  send(){
    var dts={
      "fotoBanner":this.productForm.value.nombre,
    }
    this.serv.addBaner(dts).then(()=>{
     
      this.presentToast('Se ha Creado un nuevo banner.')
      this.productForm.reset();
    })
  }
  send2(){
    var dts={
      "nombre":this.productForm2.value.nombre,
    }
    this.serv.creeateSeccion(dts).then(()=>{
      this.presentToast('Se ha Creado una nueva sección.')
      this.productForm2.reset();
     
    })
  }
  borrarBanner(item){
    this.serv.removeBanner(item.id).then(()=>{
      this.presentToast('Se ha eliminado el banner.')
    })
  }
  borrar2(item){
    this.serv.removeSeccion(item.id).then(()=>{
      this.presentToast('Se ha eliminado <b>'+item.nombre+'</b>.')
    })
  }

  goProductos(){
    this.route.navigateByUrl('/adminproducts');
  }
  goCategorias(){
    this.route.navigateByUrl('/catalogos');
  }
  goPreventas(){
    this.route.navigateByUrl('/adminpreventas');
  }
  ngOnInit() {
    this.serv.getBanners().subscribe(res=>{
      this.todos= res;
      // console.log("Tareas",res);
    });
  }

}
