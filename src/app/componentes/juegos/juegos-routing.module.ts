import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuJuegosComponent } from '../menu-juegos/menu-juegos.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { CommonModule } from '@angular/common';
import { SnakeGameComponent } from './snake-game/snake-game.component';

const routes: Routes = [
  {path:'ahorcado', component: AhorcadoComponent},
  {path:'mayor-menor', component: MayorMenorComponent},
  {path:'preguntados', component:PreguntadosComponent},
  {path:'viborita', component:SnakeGameComponent},
  {path:'', component: MenuJuegosComponent},
];

@NgModule({
  declarations: [PreguntadosComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule],
  exports: [RouterModule]
})
export class JuegosRoutingModule {}