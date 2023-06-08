import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { NotificationService } from 'src/app/servicios/notification.service';
import { SweetalertService } from 'src/app/servicios/sweetalert.service';


@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css'],
})
export class AhorcadoComponent implements OnInit {
  user: any = null;
  buttonLetters: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'Ñ',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  listOfWords: string[] = [
    'CASA',
    'PERRO',
    'BIBLIOTECA',
    'MILANESA',
    'PYTHON',
    'TETRIS',
    'ASTRONAUTA',
  ];
  victory: boolean = false;
  activeGame: boolean = true;
  attempts: number = 6;
  score: number = 0;
  image: number | any = 0;
  word: string = '';
  hyphenatedWord: string[] = [];

  constructor(
    private router: Router,
    private authlogin:AuthService,
    private firestore:FirestoreService,
    private notifyService: NotificationService,
    private serviceAlert:SweetalertService
  ) {
    this.word =
      this.listOfWords[
        Math.round(Math.random() * (this.listOfWords.length - 1))
      ];
    this.hyphenatedWord = Array(this.word.length).fill('_');
  }
  
  ngOnInit(): void {
  }

  restartGame() {
    this.word =
      this.listOfWords[
        Math.round(Math.random() * (this.listOfWords.length - 1))
      ];
    this.hyphenatedWord = Array(this.word.length).fill('_');
    this.activeGame = true;
    this.attempts = 6;
    this.score = 0;
    this.image = 0;
    this.victory = false;
    this.resetClassBotones();
    this.notifyService.toasInfo('Juego Reiniciado', 'Ahorcado');
  } // end of restartGame

  sendLetter(letter: string, idDelBoton:number) {
    let letterFlag: boolean = false;
    let winGame: boolean = false;

    if (this.activeGame) {
      const alreadyGuessedLetterFlag: boolean = this.hyphenatedWord.some(
        (c) => c === letter
      );
      for (let i = 0; i < this.word.length; i++) {
        const wordLetter = this.word[i];
        if (wordLetter === letter && !alreadyGuessedLetterFlag) {
          this.hyphenatedWord[i] = letter;
          letterFlag = true;
          this.score++;
          winGame = this.hyphenatedWord.some((hyphen) => hyphen == '_');
          if (!winGame) {
            this.image = this.image + '_v';
            this.activeGame = false;
            this.victory = true;
            this.createResult();
            this.notifyService.toasCorrecto('GANASTE', 'Ahorcado', "toast-bottom-right");
            this.serviceAlert.showSuccessAlert(`¡Felicitaciones, Has ganado utilizando `+(6-this.attempts)+" intentos!", "Juego terminado ¡Has ganado!", 'success');
            break;
          }
        }
      }

      if (!letterFlag && !alreadyGuessedLetterFlag) {
        if (this.attempts > 0) {
          this.attempts--;
          this.image++;
          this.notifyService.toasError('¡Ups, no adivinaste!', 'Juego: Ahorcado');
          const elemento = document.getElementById("boton"+idDelBoton) as HTMLButtonElement;
          elemento?.classList.remove("btn-letra");
          elemento?.classList.add("btn-error");
          if(elemento!=null)
          {
            elemento.disabled = true;
          }
          if (this.attempts === 0) {
            this.notifyService.toasError('perdiste, vuelva a intentarlo', 'Juego: Ahorcado');
            this.serviceAlert.showSuccessAlert(`¡A no Decaer, vuelva a intentarlo!`, "Juego terminado ¡Has Perdido! :(", 'error');
            this.activeGame = false;
            this.createResult();
          }
        }

        if (this.score > 0) {
          this.score--;
        }
      } else if (alreadyGuessedLetterFlag) {
        this.notifyService.toasAlerta('Esta letra ya fue adivinada', 'Juego: Ahorcado');
      } else if (letterFlag) {
        if(!this.victory) {
          this.notifyService.toasCorrecto('¡Excelente, adivinaste!', 'Juego: Ahorcado', "toast-bottom-right");
          const elemento = document.getElementById("boton"+idDelBoton) as HTMLButtonElement;
          elemento?.classList.remove("btn-letra");
          elemento?.classList.add("btn-acierto");
          if(elemento!=null)
          {
            elemento.disabled = true;
          }
        }
      }
    } else {
      this.notifyService.toasInfo(
        '¿Quieres seguir jugando?, reinicia el juego!',
        'Juego: Ahorcado'
      );
    }
  } // end of sendLetter

  resetClassBotones(){
    for (let index = 0; index < this.buttonLetters.length; index++) {
      const elemento = document.getElementById("boton"+index) as HTMLButtonElement;
      elemento?.classList.remove("btn-error");
      elemento?.classList.remove("btn-acierto");
      elemento?.classList.add("btn-letra");
      if(elemento!=null)
      {
        elemento.disabled = false;
      }
      
    }
  }

  createResult() {
    const resultado={
      juego:"ahorcado",
      puntaje:this.score,
      usuarioMail:this.authlogin.emailDelUserQueSeLogueo,
      victoria:this.victory
    }
    this.firestore.guardarResultado(resultado);
  } // end of createResult


  generarPista(){
    

    switch (this.word) {


      case 'CASA':
        this.serviceAlert.showSuccessAlert(`Edificación destinada para ser habitada....`, "Aquí va una pista ", 'info');
        break;

      case 'PERRO':
        this.serviceAlert.showSuccessAlert(`Animal doméstico....`, "Aquí va una pista ", 'info');
        break;

      case 'BIBLIOTECA':
        this.serviceAlert.showSuccessAlert(`Sitio donde podemos recurrir para leer, buscar información y estudiar....`, "Aquí va una pista ", 'info');
        break;

      case 'MILANESA':
        this.serviceAlert.showSuccessAlert(`Comida tipica Argentina....`, "Aquí va una pista ", 'info');
        break;

      case 'PYTHON':
        this.serviceAlert.showSuccessAlert(`Lenguaje de programación....`, "Aquí va una pista ", 'info');
        break;

      case 'TETRIS':
        this.serviceAlert.showSuccessAlert(`Uno de los juegos mas vendidos en la historia....`, "Aquí va una pista ", 'info');
        break;
    
      default:
        this.serviceAlert.showSuccessAlert(`Persona que va al espacio, todo niño soño ser uno....`, "Aquí va una pista ", 'info');
        break;
    }
  }
}
