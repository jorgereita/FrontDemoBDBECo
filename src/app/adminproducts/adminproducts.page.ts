import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { servicios } from '../services/services';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-adminproducts',
  templateUrl: './adminproducts.page.html',
  styleUrls: ['./adminproducts.page.scss'],
})
export class AdminproductsPage implements OnInit {
  public productForm: FormGroup;
  todos
  catalogos
  secciones
  tab = '0'
  constructor(private serv: servicios, 
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public toastController: ToastController,
    private route:Router) {

    this.productForm = formBuilder.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      seccion: [''],
      cantidad: ['',Validators.required],
      foto: ['',Validators.required],
      precio: ['', Validators.required],
      descripcion: ['',  ],
    });
  }
  goCategorias(){
    this.route.navigateByUrl('/catalogos');
  }
  goPreventas(){
    this.route.navigateByUrl('/adminpreventas');
  }
  goEventos(){
    this.route.navigateByUrl('/eventos');
  }
  goAdmin(){
    this.route.navigateByUrl('/admin');
  }
  async presentToast(e) {
    const toast = await this.toastController.create({
      message: e,
      color:'success',
      duration: 2000
    });
    toast.present();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atención',
      subHeader: '',
      message: ' .',
      buttons: ['OK']
    });

    await alert.present();
  }
  send(){
    var dts={
      "nombre":this.productForm.value.nombre,
      "categoria":this.productForm.value.categoria,
      "seccion":this.productForm.value.seccion, 
      "cantidad":this.productForm.value.cantidad,
      "foto":this.productForm.value.foto,
      "precio":this.productForm.value.precio,
      "descripcion":this.productForm.value.descripcion,
    }
    this.serv.addTodo(dts).then(()=>{
       this.presentToast('Se ha creado un nuevo producto.')
    })
  }
  async presentAlertConfirm(item) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atención !',
      message: 'Desea borrar '+item.nombre+' ?',
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
            this.borrar(item)
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
      message: 'Desea actualizar el producto '+item.nombre+' ?',
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
            this.actualizar(item)
          }
        }
      ]
    });

    await alert.present();
  }
  actualizar(item){

    this.serv.updateTodo(item,item.id).then(()=>{
      this.presentToast('Se ha actualizado <b>'+item.nombre+'</b>.')
    })
  }
  onChangeCat(event){  
  let content = this.catalogos.find(key=> key.id == event.detail.value).colecccion

   this.secciones=content;
  }
  borrar(item){

    this.serv.removeTodo(item.id).then(()=>{
      this.presentToast('Se ha eliminado <b>'+item.nombre+'</b>.')
    })
  }
  ngOnInit() {
    this.serv.getTodos().subscribe(res=>{
      this.todos= res;
    });
    this.serv.getCatalogos().subscribe(res=>{ 
      this.catalogos= res;
    });
    this.serv.getSeccion().subscribe(res=>{
      // this.secciones= res;
    });
  }

}
