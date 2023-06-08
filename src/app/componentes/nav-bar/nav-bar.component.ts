import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  arrayDeUsuarios :any[]=[]
  nombreDelUsuarioLogueado:string="";

  constructor(public authlogin:AuthService, public firestore:FirestoreService){
  }

  cerrarSesion(){
    this.authlogin.desloguear()
  }

  ngOnInit() {
    
    this.firestore.traer("usuarios").subscribe(usuarios => {
      for (const unUser of usuarios) {
        this.arrayDeUsuarios.push(unUser);
        if(this.authlogin.emailDelUserQueSeLogueo==unUser["emailUsuario"]){
          this.nombreDelUsuarioLogueado=unUser["nombreUsuario"];
          break;
        }
        // console.log( this.formatearFecha(unUser["fechaIngresoUsuario"].toDate()));
      }
    })};

  formatearFecha(fecha:Date){
    const formatoFecha = new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric',  hour: '2-digit', minute: '2-digit', second: '2-digit'  });
    return formatoFecha.format(fecha)
  }
}
