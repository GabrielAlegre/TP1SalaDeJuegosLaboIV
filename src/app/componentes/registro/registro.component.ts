import { Component } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { SweetalertService } from 'src/app/servicios/sweetalert.service';
import * as moment from 'moment';
import { NotificationService } from 'src/app/servicios/notification.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  correoValido: boolean = false;
  passValido: boolean = false;
  passValidoConf: boolean = false;
  nameValido: boolean = false;
  arrayDeUsuarios:any[]=[]
  email:string="";
  clave:string="";
  nombre:string="";
  claveConfirmadora:string="";
  mostrarSpinner = false;
  constructor(private serviceAlert:SweetalertService, private firestore:FirestoreService, private toas:NotificationService)
  {
  }

  ngOnInit() {
    this.firestore.traer("usuarios").subscribe(usuarios => {
      for (const unUser of usuarios) {
        this.arrayDeUsuarios.push(unUser);
      }
    })};

  registrar()
  {
    if(this.email!="" && this.clave!="" && this.nombre!="" && this.claveConfirmadora!="")
    {
      if(this.clave==this.claveConfirmadora)
      {
        if(this.verificarQueExisteEmail(this.email)==false){
          this.firestore.guardarUsuario(new Usuario(this.clave, this.email, moment(new Date()).format('DD-MM-YYYY HH:mm:ss'), this.nombre));
          this.mostrarSpinner = true;
          setTimeout(() => {
            this.mostrarSpinner = false;
          }, 3000);
        }
        else
        {
          this.serviceAlert.showSuccessAlert(`Ya existe un usuario con ese email`, "No se pudo registrar!", 'error');
        }
      
      }
      else
      {
        this.serviceAlert.showSuccessAlert(`Las claves deben coincidir`, "Ups!", 'warning');
      }
    }
    else
    {
      this.serviceAlert.showSuccessAlert(`Debe completar todos los campos`, "Ojooo!", 'warning');
    }
  
  }

  verificarQueExisteEmail(emailIngresado:string){
    let existeElCorreo=false;
    for (const unUsuario of this.arrayDeUsuarios) {
      if(unUsuario.emailUsuario==emailIngresado){
        existeElCorreo=true;
        break;
      }
    }
    return existeElCorreo;
  }


  validarName() {
    if (this.nombre.match(/[a-zA-Z]/) && this.nombre.length<15 && this.nombre.length>2) {
      this.nameValido = true;
    } else {
      this.nameValido = false;
    }
  }

  validarCorreo() {
    if (this.email.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/)&& this.email.length>6) {
      this.correoValido = true;
    } else {
      this.correoValido = false;
    }
  }

  validarPass() {
    if (this.clave.match(/[0-9a-zA-Z]{6,}/)){
      this.passValido = true;
    } else {
      this.passValido = false;
    }
  }

  validarPassConf() {
    if (this.claveConfirmadora==this.clave) {
      this.passValidoConf = true;
    } else {
      this.passValidoConf = false;
    }
  }
}
