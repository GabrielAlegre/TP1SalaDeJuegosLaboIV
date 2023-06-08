import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Router } from '@angular/router';
import { SweetalertService } from './sweetalert.service';
import { NotificationService } from './notification.service';
import { addDoc, collection, collectionData, Firestore, getDoc, getDocs, updateDoc } from "@angular/fire/firestore";
import * as moment from 'moment';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private angularFirestore: AngularFirestore, private router:Router, private serviceAlert:SweetalertService, private notificacion:NotificationService, private firestore: Firestore) { }
  token:string="";
  sePudo:boolean=false;
  esconderBotonCierre:boolean=true;
  emailDelUserQueSeLogueo:string="";
  nombreDelUserQueSeLogueo:string="";

  login(email:string|any, password:string|any, esRegistro:number, nombreUser?:string)
  {
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      response=>{
        firebase.auth().currentUser?.getIdToken().then(
          token=>{
            this.notificacion.toasCorrecto("Bienvenido "+nombreUser, "Inicio de sesion exitoso");
            this.emailDelUserQueSeLogueo=email;
            this.token=token;
            this.sePudo=true;
            this.esconderBotonCierre=false; 
            if(nombreUser!=undefined)
            {
              this.nombreDelUserQueSeLogueo=nombreUser;
              this.generarLogLoginUser(nombreUser);
            }
            this.router.navigate(['/home']);
          
            if(esRegistro==0){

              this.serviceAlert.showSuccessAlert(`Login exitoso`, "Bienvenido "+nombreUser+"!", 'success');
            }
            else{
              this.serviceAlert.showSuccessAlert(`Se registro correctamente al usuario `, "excelente!", 'success');
            }
            
            
          }
        )
      }
    )
    .catch(
      error=>{
        this.sePudo=false;
        if(email=="" || password=="")
        {
          this.serviceAlert.showSuccessAlert(`Debe completar todos los campos para iniciar sesión `, "Ups!", 'warning');
        }
        else{
          this.serviceAlert.showSuccessAlert(`Debe campos incorrectos`, "Ups!", 'error');
        }
      }
    )
  }

  generarLogLoginUser(nombre:string){
    const col = collection(this.firestore, 'logsUsuarios');
    addDoc(col, {nombreUsuario:nombre, fechaLogeoUsuario: moment(new Date()).format('DD-MM-YYYY HH:mm:ss')});
  }

  getIdToken(){
    return this.token;
  }

  desloguear(){
    firebase.auth().signOut();
    this.token="";
    this.router.navigateByUrl("login");
    this.serviceAlert.showSuccessAlert(`Cierre de sesion exitoso!`, "Excelente!", 'success');
    this.esconderBotonCierre=true;
    this.sePudo=false;
  }


  getSeLogueo()
  {
    return this.sePudo;
  }

  getEstaLogueado(){
    return this.esconderBotonCierre;
  }

  getEmailUser(){
    return firebase.auth().currentUser?.email;
  }

}
