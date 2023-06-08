import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { ErrorComponent } from './componentes/error/error.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { SnakeGameComponent } from './componentes/juegos/snake-game/snake-game.component';
import { AhorcadoComponent } from './componentes/juegos/ahorcado/ahorcado.component';
import { MenuJuegosComponent } from './componentes/menu-juegos/menu-juegos.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { ListadoResultadosComponent } from './componentes/listado-resultados/listado-resultados.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "registro", component: RegistroComponent},
  {path: "quienSoy", component: QuienSoyComponent},
  {path: "chat", component: ChatComponent},
  {path: "encuesta", component: EncuestaComponent},
  {path: "listadoJuegos", component:ListadoResultadosComponent},
  {path: "menuJuegos", loadChildren:() => import('./componentes/juegos/juegos-routing.module').then((m) => m.JuegosRoutingModule)},
  {path: "**", component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
