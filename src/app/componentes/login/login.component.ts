import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { NotificationService } from 'src/app/servicios/notification.service';
import { SweetalertService } from 'src/app/servicios/sweetalert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  correoValido: boolean = false;
  passValido: boolean = false;
  contraBind="";
  emailBind="";
  arrayDeUsuarios:any[]=[];

  constructor(private serviceAlert:SweetalertService, private authlogin:AuthService, private notificacion:NotificationService, private firestore:FirestoreService)
  {
  }

  ngOnInit() {
    this.firestore.traer("usuarios").subscribe(usuarios => {
      for (const unUser of usuarios) {
        this.arrayDeUsuarios.push(unUser);
      }
    })};

  logear()
  {
    // setTimeout(() => {
    //   this.notificacion.toasCorrecto("Bienvenido a la sala de juegos!", "Inicio de sesion exitoso");
    // }, 150);
    this.authlogin.login(this.emailBind, this.contraBind,0, this.buscarNombreDelUsuarioQueSeLogeo(this.emailBind));
  }

  loginAutomatico(email:string, constraseña:string){
    this.emailBind=email;
    this.contraBind=constraseña;
    this.correoValido = true;
    this.passValido = true;
  }


  buscarNombreDelUsuarioQueSeLogeo(emailIngresado:string){
    let nombreDelUsuario="";
    for (const unUsuario of this.arrayDeUsuarios) {
      if(unUsuario.emailUsuario==emailIngresado){
        nombreDelUsuario=unUsuario.nombreUsuario;
        break;
      }
    }
    return nombreDelUsuario;
  }

  validarCorreo() {
    if (this.emailBind.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/)&& this.emailBind.length>6) {
      this.correoValido = true;
    } else {
      this.correoValido = false;
    }
  }

  validarPass() {
    if (this.contraBind.match(/[0-9a-zA-Z]{6,}/)){
      this.passValido = true;
    } else {
      this.passValido = false;
    }
  }
}
