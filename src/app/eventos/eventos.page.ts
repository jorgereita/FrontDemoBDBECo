import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { servicios } from '../services/services';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
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
      fechaEvento: ['',  Validators.required],
      Lugar: ['', Validators.required],
      foto: ['',  ],
      Link: ['',  ],
 
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
      "fechaEvento":this.productForm.value.fechaEvento,
      "Lugar":this.productForm.value.Lugar,
      // "foto":this.productForm.value.foto,
      "Link":this.productForm.value.Link,

    }
    this.serv.addEventos(dts).then(()=>{
     
      this.presentToast('Se ha creado un nuevo evento.')
      this.productForm.reset();
    })
  }
  updatePreventa(item){
    this.serv.updateEventos(item,item.id).then(()=>{
      this.presentToast('Se ha actualizado <b>'+item.nombre+'</b>.')
    })
  }
  borrarItem(item){
    this.serv.removeEventos(item.id).then(()=>{
      this.presentToast('Se ha eliminado el evento.')
    })
  }
  borrar2(item){
    this.serv.removeEventos(item.id).then(()=>{
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
    this.serv.getEventos().subscribe(res=>{
      this.todos= res;
      // console.log("Tareas",res);
    });
  }
}
