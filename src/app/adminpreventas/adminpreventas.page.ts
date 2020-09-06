import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { servicios } from '../services/services';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-adminpreventas',
  templateUrl: './adminpreventas.page.html',
  styleUrls: ['./adminpreventas.page.scss'],
})
export class AdminpreventasPage implements OnInit {

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
      Descripcion: ['',  ],
      fechaLanzamiento: ['',  ],
      precio: ['', Validators.required],
      foto: ['', Validators.required],
      cantidad: ['', Validators.required],

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
            this.borrarItem(item)
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
            this.updatePreventa(item)
          }
        }
      ]
    });

    await alert.present();
  }
  send(){
    var dts={
      "nombre":this.productForm.value.nombre,
      "Descripcion":this.productForm.value.Descripcion,
      "fechaLanzamiento":this.productForm.value.fechaLanzamiento,
      "precio":this.productForm.value.precio,
      "foto":this.productForm.value.foto,
      "cantidad":this.productForm.value.cantidad,

    }
    this.serv.addPreventa(dts).then(()=>{
     
      this.presentToast('Se ha Creado un nuevo banner.')
      this.productForm.reset();
    })
  }
  updatePreventa(item){
    this.serv.updatePreventa(item,item.id).then(()=>{
      this.presentToast('Se ha actualizado <b>'+item.nombre+'</b>.')
    })
  }
  borrarItem(item){
    this.serv.removePreventa(item.id).then(()=>{
      this.presentToast('Se ha eliminado la preventa.')
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
  goAdmin(){
    this.route.navigateByUrl('/admin');
  }
  goCategorias(){
    this.route.navigateByUrl('/catalogos');
  }
  goEventos(){
    this.route.navigateByUrl('/eventos');
  }
  ngOnInit() {
    this.serv.getPreventas().subscribe(res=>{
      this.todos= res;
      
    });
  }

}
