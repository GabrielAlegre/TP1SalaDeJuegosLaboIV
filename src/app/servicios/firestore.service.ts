import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { addDoc, collection, collectionData, Firestore, getDoc, getDocs, updateDoc } from "@angular/fire/firestore";
import { SweetalertService } from './sweetalert.service';
import { Usuario } from '../clases/usuario';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {


  seRegistro:boolean=false;

  constructor(private angularFirestore:AngularFirestore,  private authlogin:AuthService, private firestore: Firestore, private serviceAlert:SweetalertService, private angularFireAuth: AngularFireAuth,private router:Router, private notificacion:NotificationService) { }

  traer(nombreDeLaColeccion:string){
    return collectionData(collection(this.firestore, nombreDeLaColeccion));
  }

  traerMensajesOrdenados(){
    const col = this.angularFirestore.collection("chats", (ref:any) => ref.orderBy('fechaDeEnvio', 'asc').limit(25));
    return col.valueChanges();
  }

  guardarUsuario(usuario:Usuario){
    //primero agrego el usuario registrado al Authentication de firebase
    this.angularFireAuth.createUserWithEmailAndPassword(usuario.emailUsuario,  usuario.claveUsuario).then((data) =>{
      this.seRegistro=true;

      /*cuando me asegure de que se guardo correctamente el usuario registrado en el Authentication de firebase, lo guardo 
      en el firestore database en el documento "usuarios" donde se guardan los usuarios*/
      // this.serviceAlert.showSuccessAlert(`Se dio de registro correctamente al usuario `+ usuario.nombreUsuario, "excelente!", 'success');
      const col = collection(this.firestore, 'usuarios');
      addDoc(col, {claveUsuario: usuario.claveUsuario, emailUsuario: usuario.emailUsuario, 
      fechaIngresoUsuario:usuario.fechaIngresoUsuario, nombreUsuario:usuario.nombreUsuario});
      // this.notificacion.toasCorrecto("Bienvenido "+usuario.nombreUsuario, "Inicio de sesion exitoso");
      this.authlogin.login(usuario.emailUsuario, usuario.claveUsuario,1, usuario.nombreUsuario);
        // this.router.navigate(['/home']);
        
    })
    .catch((error) => {
      if("auth/email-already-in-use"){
        this.seRegistro=false;
      }
      else{
        this.serviceAlert.showSuccessAlert(`No se realizo el registro`+error, "Error!", 'error');
        this.seRegistro=false;
      }
    });
  }

  guardarMensaje(mensaje:string, correo:string, nombre:string){
    const col = collection(this.firestore, 'chats');
    addDoc(col, {textoMensaje: mensaje, emailUsuario: correo, nombreUsuario:nombre, fechaDeEnvio:moment(new Date()).format('DD-MM-YYYY HH:mm:ss')});
  }

  guardarEncuesta(encuesta:any){
    console.log(encuesta);
    const col = collection(this.firestore, 'encuesta');
    addDoc(col, {apellido: encuesta.apellido, 
      calificacion: encuesta.calificacion, 
      checkbox:encuesta.checkbox, 
      edad:encuesta.edad, 
      nombre:encuesta.nombre, 
      radio:encuesta.radio, 
      select:encuesta.select, 
      usuario:encuesta.usuario, 
      telefono:encuesta.telefono, 
      fecha:moment(new Date()).format('DD-MM-YYYY HH:mm:ss')});
  }

  guardarResultado(resultado:any){
    console.log(resultado);
    const col = collection(this.firestore, 'resultadosJuegos');
    addDoc(col,{
    juego:resultado.juego, 
    puntaje:resultado.puntaje, 
    victoria:resultado.victoria, 
    usuarioMail:resultado.usuarioMail, 
    fecha:moment(new Date()).format('DD-MM-YYYY HH:mm:ss')});
  }
}
