import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './componentes/error/error.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { LoadingComponent } from './componentes/loading/loading.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ChatComponent } from './componentes/chat/chat.component';
import { SnakeGameComponent } from './componentes/juegos/snake-game/snake-game.component';
import { AhorcadoComponent } from './componentes/juegos/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './componentes/juegos/mayor-menor/mayor-menor.component';
import { MenuJuegosComponent } from './componentes/menu-juegos/menu-juegos.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListadoResultadosComponent } from './componentes/listado-resultados/listado-resultados.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    QuienSoyComponent,
    RegistroComponent,
    ErrorComponent,
    NavBarComponent,
    LoadingComponent,
    ChatComponent,
    SnakeGameComponent,
    AhorcadoComponent,
    MayorMenorComponent,
    MenuJuegosComponent,
    EncuestaComponent,
    ListadoResultadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
