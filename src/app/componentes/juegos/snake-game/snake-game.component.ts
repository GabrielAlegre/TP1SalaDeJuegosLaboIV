import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { fromEvent, interval, Subscription } from 'rxjs';
import { buffer, filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { AuthService } from 'src/app/servicios/auth.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { NotificationService } from 'src/app/servicios/notification.service';
import { SweetalertService } from 'src/app/servicios/sweetalert.service';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.css']
})
export class SnakeGameComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>|any;

  isGameOver: boolean = true;
  mostrarGameOver: boolean = false;
  inicioJuego: boolean = false;
  startButtonText: string = 'Comenzar a Jugar';
  score: number = 0;
  textoGameOver:string="";
  gano:boolean=false;
  private context: CanvasRenderingContext2D|any;
  private snake: Array<{ x: number; y: number }> = [];
  private direction: { x: number; y: number } = { x: 1, y: 0 };
  private food: { x: number; y: number }|any;
  private snakeSize: number|any;
  private canvasSize: number|any;
  private gameRunning: boolean|any;
  private gameLoop$: Subscription|any;
  private directions = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 }
  };

  

  constructor(private serviceAlert:SweetalertService, private notifyService: NotificationService, private authService:AuthService, private firestore:FirestoreService) {}

  ngOnInit() {

      // this.context = this.canvas.nativeElement.getContext('2d');
      // this.snakeSize = 20;
      // this.canvasSize = 700;
      // this.canvas.nativeElement.width = this.canvasSize;
      // this.canvas.nativeElement.height = this.canvasSize;
      // this.startGame();
    
  }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    // Resto del código que utiliza this.context
  }


  startGame() {
    this.inicioJuego = true;
    this.notifyService.toasInfo('Juego iniciado', 'Juego: Snake');
    this.mostrarGameOver = false;
    this.isGameOver = false;
    this.context = this.canvas.nativeElement.getContext('2d');
    this.snakeSize = 20;
    this.canvasSize = 640;
    this.canvas.nativeElement.width = this.canvasSize;
    this.canvas.nativeElement.height = this.canvasSize;
    this.score = 0;
    this.startButtonText = 'Volver a Jugar';

    this.snake = [{ x: 200, y: 200 }]; // Posición inicial de la serpiente
    this.direction = { x: 1, y: 0 }; // Dirección inicial de la serpiente
    this.food = this.generateFood(); // Generar comida inicial

    this.gameRunning = true;
    this.gameLoop$ = interval(100).subscribe(() => {
      this.clearCanvas();
      this.moveSnake();
      this.checkCollision();
      this.drawSnake();
      this.drawFood();
    });

    // Manejar las teclas de dirección
    fromEvent<KeyboardEvent>(document, 'keydown')
        .pipe(
            map(event => event.key),
            filter(key => ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)),
            takeUntil(fromEvent(this.canvas.nativeElement, 'click'))
        )
        .subscribe(key => {
            this.changeDirection(key);
        });
}
  moveSnake() {
    const head = { ...this.snake[0] };
    head.x += this.direction.x * this.snakeSize;
    head.y += this.direction.y * this.snakeSize;

    this.snake.unshift(head); // Agregar la nueva posición al principio del array

    if (this.snake[0].x === this.food.x && this.snake[0].y === this.food.y) {
      this.score+=10; // Incrementar el puntaje
      this.notifyService.toasCorrecto('Sumaste 10 puntos', 'Bien!', "toast-bottom-center", 1000);
      this.snake.push({ x: this.food.x, y: this.food.y }); // Agregar un segmento a la serpiente
      this.food = this.generateFood(); // Generar nueva comida
    }
  
    // Verificar si la serpiente ha alcanzado la comida
    if (head.x === this.food.x && head.y === this.food.y) {
      this.food = this.generateFood(); // Generar nueva comida
    } else {
      this.snake.pop(); // Eliminar la última posición de la serpiente si no ha alcanzado la comida
    }
  }

  changeDirection(key: string) {
    const newDirection = this.directions[key as keyof typeof this.directions];
    if (newDirection && this.direction.x !== -newDirection.x && this.direction.y !== -newDirection.y) {
      this.direction = newDirection;
    }
  }

  drawSnake() {
    this.snake.forEach(segment => {
      this.context.fillStyle = 'green';
      this.context.fillRect(segment.x, segment.y, this.snakeSize, this.snakeSize);
    });
  }

  drawFood() {
    this.context.fillStyle = 'red';
    this.context.fillRect(this.food.x, this.food.y, this.snakeSize, this.snakeSize);
  }

  generateFood() {
    const maxX = this.canvasSize - this.snakeSize;
    const maxY = this.canvasSize - this.snakeSize;
    const x = Math.floor(Math.random() * maxX / this.snakeSize) * this.snakeSize;
    const y = Math.floor(Math.random() * maxY / this.snakeSize) * this.snakeSize;
    return { x, y };
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvasSize, this.canvasSize);
  }

  checkCollision() {
    const head = this.snake[0];
    const maxX = this.canvasSize - this.snakeSize;
    const maxY = this.canvasSize - this.snakeSize;
  
    // Verificar si la serpiente toca el borde
    if (head.x < 0 || head.x > maxX || head.y < 0 || head.y > maxY) {
      this.gameOver();
    }

    if (this.snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
      this.gameOver();
    }
  }
  
  gameOver() {
   
    this.isGameOver = true;
    this.mostrarGameOver = true;
    this.startButtonText = 'Volver a Jugar';
    this.gameRunning = false;
    this.gameLoop$.unsubscribe();

    if(this.score >= 50)
    {
      this.serviceAlert.showSuccessAlert(`Felicitaciones tuviste una puntuacion igual o mayor a 50!!! `, "Juego terminado ¡Has ganado!", 'success') 
      this.textoGameOver="¡HAS GANADO!";
      this.gano=true;
      // this.textoGameOver=`¡Felicitaciones HAS GANADO!
      // Su puntuación fue de ${ this.score }
      // ¡Sigue jugando!`;
    }else{
      this.serviceAlert.showSuccessAlert(`Tuviste una puntuacion menor a 50 ¡Sigue intentado! `, "Juego terminado ¡Has Perdido! :(", 'error');
      this.textoGameOver="¡HAS PERDIDO!";
      this.gano=false;

      // this.textoGameOver=`¡Ups HAS PERDIDO :(!
      //    Su puntuación fue de ${ this.score } 
      //    ¡A no Decaer, vuelva a intentarlo!`;
    }

    const resultado={
      juego:"snake",
      puntaje:this.score,
      usuarioMail:this.authService.emailDelUserQueSeLogueo,
      victoria:this.gano
    }
    this.firestore.guardarResultado(resultado);

    
    
    // alert(`Game Over! Score: ${this.score}`);
  }

  restartGame() {
    this.isGameOver = false;
    this.score = 0;
    this.startGame();
    
  }
}