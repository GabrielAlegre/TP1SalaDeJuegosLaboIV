import { Component } from '@angular/core';
import { AuthService } from './servicios/auth.service';
import firebase from 'firebase/compat/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'salaDeJuegoTp1LaboIV';

  ngOnInit(): void {
    firebase.initializeApp(environment.firebase)}
}
