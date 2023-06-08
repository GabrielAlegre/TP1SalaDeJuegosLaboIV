import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public authlogin:AuthService, public firestore:FirestoreService){

  }

  // ngOnInit() {
    
  //   this.firestore.traer("usuarios").subscribe(usuarios => {
  //     for (const unUser of usuarios) {
  //       console.log( this.formatearFecha(unUser["fechaIngresoUsuario"].toDate()));
  //     }
  //   })};

  // formatearFecha(fecha:Date){
  //   const formatoFecha = new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric',  hour: '2-digit', minute: '2-digit', second: '2-digit'  });
  //   return formatoFecha.format(fecha)
  // }
}
