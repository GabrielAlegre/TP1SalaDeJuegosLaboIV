import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCountriesService } from 'src/app/servicios/api-countries.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { NotificationService } from 'src/app/servicios/notification.service';
import { SweetalertService } from 'src/app/servicios/sweetalert.service';


@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css'],
})
export class PreguntadosComponent implements OnInit {
  user: any = null;
  listOfCountries: any = [];
  listOfQuestions: any = [];
  victory: boolean = false;
  activeGame: boolean = false;
  gameOver: boolean = false;
  gameOverText: string = '¡PERDISTE :(!';
  score: number = 0;
  attempts: number = 10;
  currentQuestion: any = null;
  loadedQuestions: boolean = false;
  currentIndex: number = 0;
  correctAnswer: boolean = false;
  wrongAnswer: boolean = false;

  constructor(
    private router: Router,
    private apiPaises: ApiCountriesService,
    private notifyService: NotificationService,
    private firestore:FirestoreService,
    private authlogin:AuthService,
    private serviceAlert:SweetalertService
  ) {
    this.apiPaises.getPaises();
  }

  async ngOnInit() {
  const paises = await this.apiPaises.getPaises();
  console.log(paises);
  this.listOfCountries = paises.map((country: any) => {
    return {
      name: country.translations.spa.official,
      flag: country.flags.png
    };
  });
  this.startGame();
  } // end of ngOnInit

  startGame() {
    this.generateQuestions();
    this.currentQuestion = this.listOfQuestions[this.currentIndex];
    this.activeGame = true;
    this.notifyService.toasInfo('Juego iniciado', 'Juego: Preguntados');
  } // end of startGame

  generateQuestions() {
    this.listOfCountries.sort(() => Math.random() - 0.5);
    this.listOfQuestions = this.listOfCountries
      .slice(0, 10)
      .map((country: any) => {
        const option2 = this.listOfCountries[this.generateRandomNumber()].name;
        const option3 = this.listOfCountries[this.generateRandomNumber()].name;
        const option4 = this.listOfCountries[this.generateRandomNumber()].name;
        const options = [country.name, option2, option3, option4].sort(
          () => Math.random() - 0.5
        );
        return {
          answer: country.name,
          options: options,
          flag: country.flag,
        };
      });
    this.loadedQuestions = true;
  } // end of generateQuestions

  generateRandomNumber() {
    return Math.floor(Math.random() * 249);
  } // end of generateRandomNumber

  play(option: string, event: Event) {
    if (this.activeGame) {
      const btn = <HTMLButtonElement>event.target;
      btn.disabled = true;
      if (option === this.currentQuestion.answer) {
        this.score++;
        this.correctAnswer = true;
        setTimeout(() => {
          this.correctAnswer = false;
        }, 300);
        this.notifyService.toasCorrecto('¡Adivinaste!', 'Juego: Preguntados');
      } else {
        this.wrongAnswer = true;
        setTimeout(() => {
          this.wrongAnswer = false;
        }, 300);
        this.notifyService.toasError(
          `No adivinaste!, era ${this.currentQuestion.answer}`,
          'Juego: Preguntados'
        );
      }

      if (this.currentIndex < 9) {
        this.currentIndex++;
        setTimeout(() => {
          this.currentQuestion = this.listOfQuestions[this.currentIndex];
        }, 500);
      }

      if (this.attempts > 0) {
        this.attempts--;
        if (this.attempts === 0) {
          this.activeGame = false;
          this.gameOver = true;
          if (this.score >= 5) {
            this.victory = true;
            this.gameOverText = '¡FELICIDADES, HAS GANADO!';
            this.notifyService.toasCorrecto('GANASTE!', 'Juego: Preguntados');
            this.serviceAlert.showSuccessAlert(`Felicitaciones tuviste una puntuacion igual o mayor a 5!!! `, "Juego terminado ¡Has ganado!", 'success');

          } else {
            this.notifyService.toasError('¡PERDISTE!', 'Juego: Preguntados');
            this.serviceAlert.showSuccessAlert(`Tuviste una puntuacion menor a 5 ¡Sigue intentado! `, "Juego terminado ¡Has Perdido! :(", 'error');
          }
          const resultado={
            juego:"preguntados",
            puntaje:this.score,
            usuarioMail:this.authlogin.emailDelUserQueSeLogueo,
            victoria:this.victory
          }
          this.firestore.guardarResultado(resultado);
        }
      }
    }
  } // end of play

  restartGame() {
    this.generateQuestions();
    this.currentIndex = 0;
    this.score = 0;
    this.attempts = 10;
    this.activeGame = true;
    this.victory = false;
    this.gameOver = false;
    this.gameOverText = '¡PERDISTE!';
    this.currentQuestion = this.listOfQuestions[this.currentIndex];
    this.notifyService.toasInfo('Juego Reiniciado', 'Juego: Preguntados');
  } // end of restartGame

  createResult() {
    const date = new Date();
    const currentDate = date.toLocaleDateString();
    const result = {
      game: 'preguntados',
      user: this.user,
      currentDate: currentDate,
      victory: this.victory,
    };
  } // end of createResult
}