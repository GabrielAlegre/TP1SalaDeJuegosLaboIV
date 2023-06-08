import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { NotificationService } from 'src/app/servicios/notification.service';
import { SweetalertService } from 'src/app/servicios/sweetalert.service';

// export interface ListadoResultadosComponent {
//   [key: string]: number;
// }


@Component({
  selector: 'app-listado-resultados',
  templateUrl: './listado-resultados.component.html',
  styleUrls: ['./listado-resultados.component.css'],
})



export class ListadoResultadosComponent implements OnInit {

  usuarioSeleccionado="";

  //Atributos de cantidad de veces jugadas
  ahorcadoVecesJugadas: number = 0;
  mayorMenorVecesJugadas: number = 0;
  preguntadosVecesJugadas: number = 0;
  viboritaVecesJugadas: number = 0;

  //Atributos de victoras por juego
  ahorcadoVictorias: number = 0;
  mayorMenorVictorias: number = 0;
  preguntadosVictorias: number = 0;
  viboritaVictorias: number = 0;

  //Atributos de derrotas por juegos
  ahorcadoDerrotas: number = 0;
  mayorMenorDerrotas: number = 0;
  preguntadosDerrotas: number = 0;
  viboritaDerrotas: number = 0;

  //Puntaje promedio de cada juego
  ahorcadoPuntajePromedio: number = 0;
  mayorMenorPuntajePromedio: number = 0;
  preguntadosPuntajePromedio: number = 0;
  viboritaPuntajePromedio: number = 0;

  //Puntaje total de cada juego
  ahorcadoPuntajeTotal: number = 0;
  mayorMenorPuntajeTotal: number = 0;
  preguntadosPuntajeTotal: number = 0;
  viboritaPuntajeTotal: number = 0;

  //Validaciones
  selecValidado:boolean=false;
  checkValidado:boolean=false;
  seleccionoAhorcado:boolean=false;
  seleccionoPreguntados:boolean=false;
  seleccionoSnake:boolean=false;
  seleccionoMayorMenor:boolean=false;
  seleccionoUnUsuario:boolean=false;


  ////////////////////////////////////////////////
  usuariosRegistrados:any=[];
  resultados:any[]=[];
  // cantidadDeVecesQueJugoCadaUsuario = new Map();
  

  ////////////////////////////////////////
    //Atributos de cantidad de veces jugadas
    ahorcadoVecesJugadasDelUsuarioSeleccionado: number = 0;
    mayorMenorVecesJugadasDelUsuarioSeleccionado: number = 0;
    preguntadosVecesJugadasDelUsuarioSeleccionado: number = 0;
    viboritaVecesJugadasDelUsuarioSeleccionado: number = 0;
  
    //Atributos de victoras por juego
    ahorcadoVictoriasDelUsuarioSeleccionado: number = 0;
    mayorMenorVictoriasDelUsuarioSeleccionado: number = 0;
    preguntadosVictoriasDelUsuarioSeleccionado: number = 0;
    viboritaVictoriasDelUsuarioSeleccionado: number = 0;
  
    //Atributos de derrotas por juegos
    ahorcadoDerrotasDelUsuarioSeleccionado: number = 0;
    mayorMenorDerrotasDelUsuarioSeleccionado: number = 0;
    preguntadosDerrotasDelUsuarioSeleccionado: number = 0;
    viboritaDerrotasDelUsuarioSeleccionado: number = 0;
  
    //Puntaje promedio de cada juego
    ahorcadoPuntajePromedioDelUsuarioSeleccionado: number = 0;
    mayorMenorPuntajePromedioDelUsuarioSeleccionado: number = 0;
    preguntadosPuntajePromedioDelUsuarioSeleccionado: number = 0;
    viboritaPuntajePromedioDelUsuarioSeleccionado: number = 0;
  
    //Puntaje total de cada juego
    ahorcadoPuntajeTotalDelUsuarioSeleccionado: number = 0;
    mayorMenorPuntajeTotalDelUsuarioSeleccionado: number = 0;
    preguntadosPuntajeTotalDelUsuarioSeleccionado: number = 0;
    viboritaPuntajeTotalDelUsuarioSeleccionado: number = 0;

  constructor(private firestore:FirestoreService,private serviceAlert:SweetalertService, private notificationService: NotificationService,) {}

  ngOnInit(): void {
    this.firestore.traer("resultadosJuegos").subscribe((res:any) => {
      if (res != null) {
        for (const unResultado of res) {
          this.resultados.push(unResultado);
        }
        // this.usuarioQueMasJugo("ahorcado");
        this.generarTablaGeneral(this.resultados);
      }
    });

    this.firestore.traer("usuarios").subscribe((res:any) => {
      for (const unUsuario of res) {
        this.usuariosRegistrados.push(unUsuario);
        // this.cantidadDeVecesQueJugoCadaUsuario.set(unUsuario.emailUsuario, 0)
      }
    });

    // console.log( this.usuariosRegistrados);
    // console.log( this.cantidadDeVecesQueJugoCadaUsuario);
    // console.log( this.usuarioQueMasJugo("preguntados"));
  }

  generarTablaGeneral(resultados:any){
      for (const unResultado of resultados) {
        switch (unResultado.juego) {
          case "preguntados":
            if(unResultado.victoria){
              this.preguntadosVictorias+=1;
            }
            else{
              this.preguntadosDerrotas+=1;
            }
            this.preguntadosVecesJugadas=this.preguntadosDerrotas+this.preguntadosVictorias;
            this.preguntadosPuntajeTotal+=unResultado.puntaje;
            this.preguntadosPuntajePromedio=this.preguntadosPuntajeTotal/this.preguntadosVecesJugadas;
            break;
          case "mayorMenor":
            if(unResultado.victoria){
              this.mayorMenorVictorias+=1;
            }
            else{
              this.mayorMenorDerrotas+=1;
            }
            this.mayorMenorVecesJugadas=this.mayorMenorDerrotas+this.mayorMenorVictorias;
            this.mayorMenorPuntajeTotal+=unResultado.puntaje;
            this.mayorMenorPuntajePromedio=this.mayorMenorPuntajeTotal/this.mayorMenorVecesJugadas;
            break;
          case "ahorcado":
            if(unResultado.victoria){
              this.ahorcadoVictorias+=1;
            }
            else{
              this.ahorcadoDerrotas+=1;
            }
            this.ahorcadoVecesJugadas=this.ahorcadoDerrotas+this.ahorcadoVictorias;
            this.ahorcadoPuntajeTotal+=unResultado.puntaje;
            this.ahorcadoPuntajePromedio=this.ahorcadoPuntajeTotal/this.ahorcadoVecesJugadas;
            break;
          default:
            if(unResultado.victoria){
              this.viboritaVictorias+=1;
            }
            else{
              this.viboritaDerrotas+=1;
            }
            this.viboritaVecesJugadas=this.viboritaDerrotas+this.viboritaVictorias;
            this.viboritaPuntajeTotal+=unResultado.puntaje;
            this.viboritaPuntajePromedio=this.viboritaPuntajeTotal/this.viboritaVecesJugadas;
            break;
        }
      }
   }//termina

   reiniciarTabla(){
    this.seleccionoUnUsuario=false;
    this.selecValidado=false;
    this.checkValidado=false;
  
    this.ahorcadoVecesJugadasDelUsuarioSeleccionado= 0;
    this.mayorMenorVecesJugadasDelUsuarioSeleccionado= 0;
    this.preguntadosVecesJugadasDelUsuarioSeleccionado= 0;
    this.viboritaVecesJugadasDelUsuarioSeleccionado= 0;
  
    
    this.ahorcadoVictoriasDelUsuarioSeleccionado= 0;
    this.mayorMenorVictoriasDelUsuarioSeleccionado= 0;
    this.preguntadosVictoriasDelUsuarioSeleccionado= 0;
    this.viboritaVictoriasDelUsuarioSeleccionado= 0;
  
    
    this.ahorcadoDerrotasDelUsuarioSeleccionado= 0;
    this.mayorMenorDerrotasDelUsuarioSeleccionado= 0;
    this.preguntadosDerrotasDelUsuarioSeleccionado= 0;
    this.viboritaDerrotasDelUsuarioSeleccionado= 0;
  
    
    this.ahorcadoPuntajePromedioDelUsuarioSeleccionado= 0;
    this.mayorMenorPuntajePromedioDelUsuarioSeleccionado= 0;
    this.preguntadosPuntajePromedioDelUsuarioSeleccionado= 0;
    this.viboritaPuntajePromedioDelUsuarioSeleccionado= 0;
  
    
    this.ahorcadoPuntajeTotalDelUsuarioSeleccionado= 0;
    this.mayorMenorPuntajeTotalDelUsuarioSeleccionado= 0;
    this.preguntadosPuntajeTotalDelUsuarioSeleccionado= 0;
    this.viboritaPuntajeTotalDelUsuarioSeleccionado= 0;
   }


  generarEstadisticasIndividuales(){
    if(this.checkValidado && this.selecValidado)
    {
      this.seleccionoAhorcado=false;
      this.seleccionoPreguntados=false;
      this.seleccionoSnake=false;
      this.seleccionoMayorMenor=false;
      const selectElement = document.getElementById("usuariosRegistrados") as HTMLSelectElement;
      this.usuarioSeleccionado = selectElement.value;
      const juegosSeleccionados = this.getValoresCheck();
      for (const juego of juegosSeleccionados) {
        if(!this.seleccionoAhorcado){
          if(juego=="ahorcado"){
            this.seleccionoAhorcado=true;
          }
        }
  
        if(!this.seleccionoMayorMenor){
          if(juego=="mayorMenor"){
            this.seleccionoMayorMenor=true;
          }
        }
  
        if(!this.seleccionoPreguntados){
          if(juego=="preguntados"){
            this.seleccionoPreguntados=true;
          }
        }
  
        if(!this.seleccionoSnake){
          if(juego=="snake"){
            this.seleccionoSnake=true;
          }
        }
      }
  
      for (const unResultado of this.resultados) {
        switch (unResultado.juego) {
          case "preguntados":
            if(this.usuarioSeleccionado==unResultado.usuarioMail)
            {
              if(unResultado.victoria){
                this.preguntadosVictoriasDelUsuarioSeleccionado+=1;
              }
              else if(!unResultado.victoria){
                this.preguntadosDerrotasDelUsuarioSeleccionado+=1;
              }
              this.preguntadosPuntajeTotalDelUsuarioSeleccionado+=unResultado.puntaje;
              this.preguntadosVecesJugadasDelUsuarioSeleccionado=this.preguntadosDerrotasDelUsuarioSeleccionado+this.preguntadosVictoriasDelUsuarioSeleccionado;
              this.preguntadosPuntajePromedioDelUsuarioSeleccionado=this.preguntadosPuntajeTotalDelUsuarioSeleccionado/this.preguntadosVecesJugadasDelUsuarioSeleccionado;
            }
            break;
          case "mayorMenor":
            if(this.usuarioSeleccionado==unResultado.usuarioMail)
            {
              if(unResultado.victoria){
                this.mayorMenorVictoriasDelUsuarioSeleccionado+=1;
              }
              else if(!unResultado.victoria){
                this.mayorMenorDerrotasDelUsuarioSeleccionado+=1;
              }
              this.mayorMenorPuntajeTotalDelUsuarioSeleccionado+=unResultado.puntaje;
              this.mayorMenorVecesJugadasDelUsuarioSeleccionado=this.mayorMenorDerrotasDelUsuarioSeleccionado+this.mayorMenorVictoriasDelUsuarioSeleccionado;
              this.mayorMenorPuntajePromedioDelUsuarioSeleccionado=this.mayorMenorPuntajeTotalDelUsuarioSeleccionado/this.mayorMenorVecesJugadasDelUsuarioSeleccionado;
            }
            break;
          case "ahorcado":
            if(this.usuarioSeleccionado==unResultado.usuarioMail)
            {
              if(unResultado.victoria){
                this.ahorcadoVictoriasDelUsuarioSeleccionado+=1;
              }
              else if(!unResultado.victoria){
                this.ahorcadoDerrotasDelUsuarioSeleccionado+=1;
              }
              this.ahorcadoPuntajeTotalDelUsuarioSeleccionado+=unResultado.puntaje;
              this.ahorcadoVecesJugadasDelUsuarioSeleccionado=this.ahorcadoDerrotasDelUsuarioSeleccionado+this.ahorcadoVictoriasDelUsuarioSeleccionado;
              this.ahorcadoPuntajePromedioDelUsuarioSeleccionado=this.ahorcadoPuntajeTotalDelUsuarioSeleccionado/this.ahorcadoVecesJugadasDelUsuarioSeleccionado;
            }
            break;
          default:
          if(this.usuarioSeleccionado==unResultado.usuarioMail)
          {
            if(unResultado.victoria){
              this.viboritaVictoriasDelUsuarioSeleccionado+=1;
            }
            else if(!unResultado.victoria){
              this.viboritaDerrotasDelUsuarioSeleccionado+=1;
            }
            this.viboritaPuntajeTotalDelUsuarioSeleccionado+=unResultado.puntaje;
            this.viboritaVecesJugadasDelUsuarioSeleccionado=this.viboritaDerrotasDelUsuarioSeleccionado+this.viboritaVictoriasDelUsuarioSeleccionado;
            this.viboritaPuntajePromedioDelUsuarioSeleccionado=this.viboritaPuntajeTotalDelUsuarioSeleccionado/this.viboritaVecesJugadasDelUsuarioSeleccionado;
          }
          break;
        }
      }
      this.notificationService.toasCorrecto("Estadisticas del usuario generada", "Excelente");
      this.seleccionoUnUsuario=true;
    }
    else{
      this.serviceAlert.showSuccessAlert(`¡Verifique que haya seleccionado un usuario y los correspondientes juegos!`, "Error, verifique los campos", 'error');
    }
  }

  validarSelect(){
    const selectElement = document.getElementById("usuariosRegistrados") as HTMLSelectElement;
    if(selectElement.value!='')
    {
      this.selecValidado = true;
    }else{
      this.selecValidado = false; 
    }
  }

  getValoresCheck() {
    const checkboxes = document.querySelectorAll('input[name="juegos"]:checked');
    const selectedValues: string[] = [];
  
    checkboxes.forEach((value: Element) => {
      const checkbox = value as HTMLInputElement; // Conversión explícita
      selectedValues.push(checkbox.value);
    });
  
    // console.log(checkboxes);
    return selectedValues;
  }

  validarCheck(){
    if(this.getValoresCheck().length!=0){
    this.checkValidado = true;
    }
    else {
      this.checkValidado = false;
    }
  }


}

  // ...

