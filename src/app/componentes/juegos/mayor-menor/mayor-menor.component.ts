import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { NotificationService } from 'src/app/servicios/notification.service';
import { SweetalertService } from 'src/app/servicios/sweetalert.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css'],
})
export class MayorMenorComponent implements OnInit {
  user: any = null;
  startButtonText: string = 'Comenzar Juego';
  victory: boolean = false;
  activeGame: boolean = false;
  gameOver: boolean = false;
  inicioJuego: boolean = false;
  textGameOver: string = '¡PERDISTE!';
  cardImage: string = '../../../../assets/mayor menor/blanca.png';
  cardList: any = [
    { type: 'copa', number: 1 },
    { type: 'copa', number: 2 },
    { type: 'copa', number: 3 },
    { type: 'copa', number: 4 },
    { type: 'copa', number: 5 },
    { type: 'copa', number: 6 },
    { type: 'copa', number: 7 },
    { type: 'copa', number: 8 },
    { type: 'copa', number: 9 },
    { type: 'copa', number: 10 },
    { type: 'copa', number: 11 },
    { type: 'copa', number: 12 },
    { type: 'espada', number: 1 },
    { type: 'espada', number: 2 },
    { type: 'espada', number: 3 },
    { type: 'espada', number: 4 },
    { type: 'espada', number: 5 },
    { type: 'espada', number: 6 },
    { type: 'espada', number: 7 },
    { type: 'espada', number: 8 },
    { type: 'espada', number: 9 },
    { type: 'espada', number: 10 },
    { type: 'espada', number: 11 },
    { type: 'espada', number: 12 },
    { type: 'basto', number: 1 },
    { type: 'basto', number: 2 },
    { type: 'basto', number: 3 },
    { type: 'basto', number: 4 },
    { type: 'basto', number: 5 },
    { type: 'basto', number: 6 },
    { type: 'basto', number: 7 },
    { type: 'basto', number: 8 },
    { type: 'basto', number: 9 },
    { type: 'basto', number: 10 },
    { type: 'basto', number: 11 },
    { type: 'basto', number: 12 },
    { type: 'oro', number: 1 },
    { type: 'oro', number: 2 },
    { type: 'oro', number: 3 },
    { type: 'oro', number: 4 },
    { type: 'oro', number: 5 },
    { type: 'oro', number: 6 },
    { type: 'oro', number: 7 },
    { type: 'oro', number: 8 },
    { type: 'oro', number: 9 },
    { type: 'oro', number: 10 },
    { type: 'oro', number: 11 },
    { type: 'oro', number: 12 },
  ];
  cardsToGuess: any = [];
  score: number = 0;
  attempts: number = 10;
  currentCard: any = null;
  currentNumber: number = 0;
  currentIndex: number = 0;

  constructor(
    private router: Router,
    public authService: AuthService,
    private firestore:FirestoreService,
    private notifyService: NotificationService,
    private serviceAlert:SweetalertService
  ) {}

  ngOnInit(): void {

  }

  startGame() {
    this.inicioJuego=true;
    this.attempts = 10;
    this.victory = false;
    this.activeGame = true;
    this.gameOver = false;
    this.textGameOver = '¡PERDISTE!';
    this.score = 0;
    this.currentIndex = 0;
    this.startButtonText = 'Volver a Jugar';
    this.cardList.sort(() => Math.random() - 0.5);
    this.cardsToGuess = this.cardList.slice(0, 11);
    this.currentCard = this.cardsToGuess[this.currentIndex];
    this.currentNumber = this.currentCard.number;
    this.cardImage = `../../../../assets/mayor menor/${this.currentCard.type}_${this.currentCard.number}.png`;
    this.notifyService.toasInfo('¡Juego Iniciado, diviértase!', 'Juego: Mayor o Menor', "toast-top-center");
  } // end startGame

  playMayorMenor(mayorMenor: string) {
    const previousNumber: number = this.currentNumber;
    this.currentIndex++;
    this.attempts--;
    this.currentCard = this.cardsToGuess[this.currentIndex];
    this.currentNumber = this.currentCard.number;
    this.cardImage = `../../../../assets/mayor menor/${this.currentCard.type}_${this.currentCard.number}.png`;

    switch (mayorMenor) {
      case 'menor':
        if (previousNumber > this.currentNumber) {
          this.score++;
          this.notifyService.toasCorrecto(
            '¡Adivinaste, es menor!',
            'SIIIII', 'toast-bottom-right', 1000
          );
        } else if (previousNumber === this.currentNumber) {
          this.notifyService.toasInfo('¡SON IGUALES!', 'Mira vos que mala suerte', 'toast-bottom-right', 1000);
        } else {
          this.notifyService.toasError('¡No adivinaste!', 'Ups', 1000);
        }
        break;
      case 'mayor':
        if (previousNumber < this.currentNumber) {
          this.score++;
          this.notifyService.toasCorrecto(
            '¡Adivinaste, es mayor!',
            'SIIIII', 'toast-bottom-right', 1000
          );
        } else if (previousNumber === this.currentNumber) {
          this.notifyService.toasInfo('¡SON IGUALES!', 'Mira vos que mala suerte', 'toast-bottom-right', 1000);
        } else {
          this.notifyService.toasError('¡No adivinaste!', 'Ups', 1000);
        }
        break;
    }

    if (this.currentIndex === 10) {
      this.activeGame = false;
      this.gameOver = true;
      if (this.score >= 5) {
        this.victory = true;
        this.textGameOver = '¡GANASTE!';
        // this.notifyService.toasCorrecto('Excelente', 'Juego terminado ¡Has ganado!');
        this.serviceAlert.showSuccessAlert(`Felicitaciones tuviste una puntuacion igual o mayor a 5!!! `, "Juego terminado ¡Has ganado!", 'success');
      } else {
        // this.notifyService.toasError('¡PERDISTE!', 'Juego terminado ¡Has Perdido! :(');
        this.serviceAlert.showSuccessAlert(`Tuviste una puntuacion menor a 5 ¡Sigue intentado! `, "Juego terminado ¡Has Perdido! :(", 'error');
      }

      const resultado={
        juego:"mayorMenor",
        puntaje:this.score,
        usuarioMail:this.authService.emailDelUserQueSeLogueo,
        victoria:this.victory
      }
      this.firestore.guardarResultado(resultado);
    }
  } // end of playMayorMenor

}