import { Component, OnInit, ViewChild } from '@angular/core';
import { servicios } from '../services/services';
import { FormBuilder } from '@angular/forms';
import { MenuController, ModalController, AlertController } from '@ionic/angular';
import { ModalCarritoComponent } from '../modal-carrito/modal-carrito.component';
import { IonInfiniteScroll } from '@ionic/angular'
import * as firebase from 'firebase'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Directive, HostListener, EventEmitter, Output, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  catalogos
  productos
  productos2
  preventas
  tab = '0'
  bolsa = []
  samples = []
  banners = []
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {

  }

  lastKey: string = ""
  isFinished = false;
  todosCheck = true;
  slideOpts = {
    initialSlide: 1,
    speed: 800,
    autoplay: true
  };

  constructor(private db: AngularFirestore,
    private serv: servicios,
    public formBuilder: FormBuilder,
    private menu: MenuController,
    private modalCtrl: ModalController,
    private router: Router,
    private alertCrtl: AlertController) { }

  ngOnInit() {
    this.serv.getCatalogos().subscribe(res => {
      let obj = []
      for (var f in res) {
        res[f].estado = false;
        obj.push(res[f])
      }
      this.catalogos = obj;

    });
    this.serv.getPreventas().subscribe(res => {
      this.preventas = res;

    });
    this.serv.getBanners().subscribe(res => {
      this.banners = res;
    });
    this.serv.getTodos().subscribe(res => {
      for (var e in res) {
        res[e].cantidad2 = 1;
      }
      this.productos = res;
      this.productos2 = res;
    });

  }
  onChangeFiltroCat(item) {

    let dts = [];
    if (item.detail.value !== '-999') {
      const splited = item.detail.value.trim().split("_")[0];
      const cat = item.detail.value.trim().split("_")[1];
      let itemSelect = this.catalogos.find(key => key.id == splited)
      let cat2 = itemSelect.colecccion[cat];
      for (var f in this.productos2) {
        if (this.productos2[f].categoria == itemSelect.id && this.productos2[f].seccion == cat2.nombre) {
          dts.push(this.productos2[f])
        }
      }

    } else {
      dts = this.productos2;
    }
    this.productos = dts;
  }
  sumaProducto(item) {
    item.cantidad2 = item.cantidad2 + 1
  }
  restaProducto(item) {
    item.cantidad2 = item.cantidad2 - 1
  }
  go() {
    this.router.navigate(['/login']);
  }
  allFilter() {
    this.todosCheck = !this.todosCheck
    this.productos = this.productos2
  }
  goFilter(e) {
    this.todosCheck = false
    e.estado = !e.estado;
    var dts = [];
    for (var f in this.productos2) {
      if (this.productos2[f].categoria.trim() == e.nombre) {
        dts.push(this.productos2[f])
      }
    }
    this.productos = dts;
  }

  evalColor(e) {
    switch (e) {
      case 1:
        return "primary"
      case 2:
        return "secondary"
      case 3:
        return "tertiary"
      case 4:
        return "success"
      case 5:
        return "warning"
      case 6:
        return "danger"
      case 7:
        return "primary"
      case 9:
        return "secondary"
      case 10:
        return "tertiary"
      case 11:
        return "success"
      case 12:
        return "warning"
      case 12:
        return "danger"
      default:
        return "primary"
        break;
    }
  }


  async irACompras() {
    const modal = await this.modalCtrl.create({
      component: ModalCarritoComponent,
      componentProps: { data: this.bolsa }
    });
    await modal.present();
  }
  async agregarPbolsa(item) {
    if (item.cantidad2 !== "" && item.cantidad2 !== 0 && item.cantidad2 > 0) {
      if (item.cantidad2 < item.cantidad) {
        this.bolsa.push(item);
        const alert = await this.alertCrtl.create({ header: 'Confirmaciòn', message: '<span  style="color:green;"> El producto a sido agregado a tu bolsa! <span> ', buttons: ['Cerrar'] });
        await alert.present();
      } else {
        const alert = await this.alertCrtl.create({ cssClass: "myalert", header: 'Alerta', message: 'No contamos con suficiente stock para tu pedido', buttons: ['Cerrar'] });
        await alert.present();
      }
    } else {
      const alert = await this.alertCrtl.create({ header: 'Alerta', message: 'Debes escoger una cantidad para este producto', buttons: ['Cerrar'] });
      await alert.present();
    }

  }

} 
