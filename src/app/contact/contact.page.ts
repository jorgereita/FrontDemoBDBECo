import { Component, OnInit, } from '@angular/core';
import {servicios} from '../services/services'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  todos

  constructor(private todoService:servicios) { 

  }

  nuevo(){
    var dts={
      "task":"Traer leche",
      "prioridad":2
    }
    this.todoService.addTodo(dts).then(()=>{

    })
  }
  ngOnInit() {
    this.todoService.getTodos().subscribe(res=>{
      this.todos= res;
      console.log("Tareas",res);
    });

  }

}
