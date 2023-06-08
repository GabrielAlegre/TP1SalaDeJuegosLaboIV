import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.css']
})
export class QuienSoyComponent {
  perfil:any
  urlApi:string = "https://api.github.com/users/GabrielAlegre"

  constructor(private router:Router,private http:HttpClient) {}

  ngOnInit(): void {
      this.http.get(this.urlApi).subscribe(res => this.perfil = res)
  }
}
