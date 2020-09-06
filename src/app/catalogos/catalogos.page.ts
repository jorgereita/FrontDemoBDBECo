import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { servicios } from '../services/services';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.page.html',
  styleUrls: ['./catalogos.page.scss'],
})
export class CatalogosPage implements OnInit {

  public productForm: FormGroup;
  public productForm2: FormGroup;
  
  todos 
  catalogos
  secciones
  tab = '0'
  itemSelect  
  nuevaExp=" "
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
  selectItem(item){
    for(var e in this.catalogos){
      this.catalogos[e].select=false;
    }
    this.itemSelect=item;
  }
  send(){
    var dts={
      "nombre":this.productForm.value.nombre,
      "colecccion":[{"nombre":"ETCO ","fecha":"2020"}]
    }
    this.serv.creeateCatalogo(dts).then(()=>{
      this.presentToast('Se ha Creado un nuevo catalogo.')
      this.productForm.reset();
    })
  }
  send2(){
    var dts={
      "nombre":this.productForm2.value.nombre,
    }
    this.serv.creeateSeccion(dts).then(()=>{
      this.presentToast('Se ha Creado una nueva expansión.')
      this.productForm2.reset();
     
    })
  }
  borrar(item){
    this.serv.removeCatalogo(item.id).then(()=>{
      this.presentToast('Se ha eliminado <b>'+item.nombre+'</b>.')
    })
  }

  borrar2(item){
    this.serv.removeSeccion(item.id).then(()=>{
      this.presentToast('Se ha eliminado <b>'+item.nombre+'</b>.')
    })
  }
  borrarDetalles(i){
    this.itemSelect.colecccion.splice(i, 1);
    this.serv.updateCatalogo(this.itemSelect,this.itemSelect.id).then(()=>{
      this.presentToast('Se ha actualizado .')
    })
  }
  actualizarDetalle(){
    this.serv.updateCatalogo(this.itemSelect,this.itemSelect.id).then(()=>{
      this.presentToast('Se ha actualizado .')
    })
  }
  goProductos(){
    this.route.navigateByUrl('/adminproducts');
  }
  goAdmin(){
    this.route.navigateByUrl('/admin');
  }
  goPreventas(){
    this.route.navigateByUrl('/adminpreventas');
  }
  goEventos(){
    this.route.navigateByUrl('/eventos');
  }
  ngOnInit() {
    this.serv.getCatalogos().subscribe(res=>{
      for(var e in res){
        res[e].select=false;
      }
      this.catalogos= res;
      console.log(this.catalogos)
    });
    this.serv.getSeccion().subscribe(res=>{
      this.secciones= res;
    });
  }
  actualizar(){
    const dts={
      "nombre":this.nuevaExp
    }
    this.itemSelect.colecccion.push(dts)
    this.serv.updateCatalogo(this.itemSelect,this.itemSelect.id).then(()=>{
      this.presentToast('Se ha actualizado  .')
    })
  }
}
