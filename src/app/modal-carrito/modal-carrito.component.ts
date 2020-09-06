import { Component, Input, ViewChild } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { IonSlides} from '@ionic/angular';
@Component({
  selector: 'app-modal-carrito',
  templateUrl: './modal-carrito.component.html',
  styleUrls: ['./modal-carrito.component.scss'],
})
export class ModalCarritoComponent   {
  @Input() data:any; 
  @ViewChild('mySlider', {static: false})  slides: IonSlides;
  total=0
  slideOpts = {
    initialSlide: 1,
    speed: 800,
  };
  constructor(
    private modalCtrl:ModalController,
    public alertController: AlertController,
    ) { }
  // data=[1]

  cerrar(){
    this.modalCtrl.dismiss();
  }
  continuar(){
    this.slides.slideNext();
  }
  calTotal(){
    this.total=0
    for(var e in this.data){
      this.total+=this.data[e].cantidad2*this.data[e].precio
    }
    return this.total
  }
  borrarItem(item){
    var id=this.data.findIndex( ket => ket.id==item.id)
    this.data.splice(id,1)
  }
  restaProducto(item){
    if(item.cantidad2-1<=0){
      item.cantidad2=0
    }else{
      item.cantidad2=item.cantidad2-1
    }
   
  }
  sumaProducto(item){
    if(item.cantidad2+1>=item.cantidad){
      this.presentAlertMessage("No existen suficientes unidades ")
    }else{
      item.cantidad2=item.cantidad2+1
    }
   
  }
  async presentAlertMessage(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atención !',
      message: msg,
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
            this.borrarItem(item)
          }
        }
      ]
    });

    await alert.present();
  }
}
