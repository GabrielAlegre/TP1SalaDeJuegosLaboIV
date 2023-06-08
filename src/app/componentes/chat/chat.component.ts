import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/servicios/auth.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  mensajesDeLaBd:any[]=[];
  mailUserQueEstaLogueado=this.authlogin.emailDelUserQueSeLogueo;
  mensajeQueSeEnviara="";

  constructor(private authlogin:AuthService, public firestore:FirestoreService, private router: Router){
  }

  ngOnInit() {
    this.firestore.traerMensajesOrdenados().subscribe(mensajes => {
      this.mensajesDeLaBd=mensajes;
      setTimeout(() => {
        this.scrollToTheLastElementByClassName();
      }, 20);
    })
  };

  enviarMensaje(){    
    this.firestore.guardarMensaje(this.mensajeQueSeEnviara,this.mailUserQueEstaLogueado ,this.authlogin.nombreDelUserQueSeLogueo);
    this.mensajeQueSeEnviara="";
    this.scrollToTheLastElementByClassName();
  }

  scrollToTheLastElementByClassName() {
    const elements = document.getElementsByClassName('mensajes');
    const lastElement: any = elements[elements.length - 1];
    if(lastElement!= null){
      const toppos = lastElement.offsetTop;

      if(toppos!=undefined){
        //@ts-ignore
        document.getElementById('contenedor-mensajes').scrollTop = toppos;
      }
    }
  }



}
