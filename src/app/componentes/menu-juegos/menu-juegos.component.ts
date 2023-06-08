import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { SweetalertService } from 'src/app/servicios/sweetalert.service';


@Component({
  selector: 'app-menu-juegos',
  templateUrl: './menu-juegos.component.html',
  styleUrls: ['./menu-juegos.component.css'],
})
export class MenuJuegosComponent  {

  
  constructor(private router: Router, private authlogin:AuthService, private serviceAlert:SweetalertService) {}

  generarAnuncio(){
    this.serviceAlert.showSuccessAlert(`Juego en Construcción, proximamente esta disponible`, "Ups, lo sentimos", 'info');
  }


}