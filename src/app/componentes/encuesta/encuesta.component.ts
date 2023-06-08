import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { NotificationService } from 'src/app/servicios/notification.service';
import { SweetalertService } from 'src/app/servicios/sweetalert.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css'],
})
export class EncuestaComponent implements OnInit {
  // user: any = null;
  // surveyForm: FormGroup;
  // validNewGame: string | boolean;

  
  nameValido: boolean = false;
  edadValidada: boolean = false;
  apellidoValido: boolean = false;
  telefonoValido: boolean = false;
  selecValidado:boolean=false;
  checkValidado:boolean=false;
  arrayDeUsuarios:any[]=[]
  edad:number=0;
  nombre:string="";
  apellido:string="";
  telefono:string="";
  mostrarSpinner = false;
  selectedOption: string = '';



  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private firestore:FirestoreService,
    private router: Router,
    private notificationService: NotificationService,
    private serviceAlert:SweetalertService
  ) {
    // this.validNewGame = false;

  } // end of constructor

  ngOnInit(): void {

  } 

  resetValores(){
    this.checkValidado=false;
    this.selecValidado=false;
    this.apellido="";
    this.nombre="";
    this.edad=0;
    this.telefono="";

    const checkbox1 = document.querySelector('#preguntados') as HTMLInputElement;
    const checkbox2 = document.querySelector('#mayorMenor') as HTMLInputElement;
    const checkbox3 = document.querySelector('#snake') as HTMLInputElement;
    const checkbox4 = document.querySelector('#ahorcado') as HTMLInputElement;
    checkbox1.checked=false;
    checkbox2.checked=false;
    checkbox3.checked=false;
    checkbox4.checked=false;

    const selectElement = document.getElementById("juegoAgregar") as HTMLSelectElement;
    selectElement.value = "Elija juego...";

    const radio1 = document.querySelector('#star-1') as HTMLInputElement;
    const radio2= document.querySelector('#star-2') as HTMLInputElement;
    const radio3= document.querySelector('#star-3') as HTMLInputElement;
    const radio4= document.querySelector('#star-4') as HTMLInputElement;
    const radio5= document.querySelector('#star-5') as HTMLInputElement;
    radio1.checked = false;
    radio2.checked = false;
    radio3.checked = false;
    radio4.checked = false;
    radio5.checked = false;

    this.nameValido = false;
    this.apellidoValido = false;
    this.edadValidada = false;
    this.telefonoValido = false;
  }

  generarEncuesta(){

    if(this.nameValido&&this.apellidoValido&&this.edadValidada&&this.telefonoValido && this.checkValidado && this.selecValidado){
      const encuesta={
        apellido:this.apellido,
        edad:this.edad,
        telefono:this.telefono,
        nombre:this.nombre,
        usuario: this.authService.emailDelUserQueSeLogueo,
        checkbox: this.getValoresCheck(),
        select: this.getValorSelect(),
        radio: this.getValorSeleccionadoDelRadio("recomendacion"),
        calificacion : this.getValorSeleccionadoDelRadio("rating"),
      }
  
      this.firestore.guardarEncuesta(encuesta);
      this.resetValores();
      this.notificationService.toasCorrecto("encuesta enviada", "todo ok");
      this.serviceAlert.showSuccessAlert(`Gracias por dar su opinion!`, "Encuesta enviado con exito", 'success');
    }
    else{
      this.serviceAlert.showSuccessAlert(`Revisa los campos`, "Error al enviar la encuesta, revisa los campos", 'error');
    }

  }

  getValoresCheck() {
    const checkboxes = document.querySelectorAll('input[name="juegos"]:checked');
    const selectedValues: string[] = [];
  
    checkboxes.forEach((value: Element) => {
      const checkbox = value as HTMLInputElement; // Conversión explícita
      selectedValues.push(checkbox.value);
    });
  
    console.log(checkboxes);
    return selectedValues;
  }

  getValorSeleccionadoDelRadio(nombreDelRadio:string) {
    const selectedRadio = document.querySelector(`input[name=${nombreDelRadio}]:checked`) as HTMLInputElement;
    if (selectedRadio) {
      const selectedValue = selectedRadio.value;
      return selectedValue;
    } else {
      return 0;
    }
  }

  getValorSelect() {
    const selectElement = document.getElementById("juegoAgregar") as HTMLSelectElement;
    const selectedValue = selectElement.value;
    return selectedValue;
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


  validarCheck(){
    if(this.getValoresCheck().length!=0){
    this.checkValidado = true;
    }
    else {
      this.checkValidado = false;
    }
  }

  validarName() {
    if (this.nombre.match(/[a-zA-Z]/) && this.nombre.length<15 && this.nombre.length>2) {
      this.nameValido = true;
    } else {
      this.nameValido = false;
    }
  }

  validarApellido() {
    if (this.apellido.match(/[a-zA-Z]/) && this.apellido.length<15 && this.apellido.length>2) {
      this.apellidoValido = true;
    } else {
      this.apellidoValido = false;
    }
  }

  validarEdad() {
    if (this.edad>17 && this.edad<100){
      this.edadValidada = true;
    } else {
      this.edadValidada = false;
    }
  }

  validarTelefono() {
    if (this.telefono.match(/[1-9]/) && (this.telefono.length==8 || this.telefono.length==10)){
      this.telefonoValido = true; 
    } else {
      this.telefonoValido = false;
    }
  }

  validarSelect(){
    const selectElement = document.getElementById("juegoAgregar") as HTMLSelectElement;
    if(selectElement.value!='')
    {
      this.selecValidado = true;
    }else{
      this.selecValidado = false; 
    }
  }
}