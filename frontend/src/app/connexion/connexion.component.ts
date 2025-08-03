import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  imports: [],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
   constructor(private router: Router) { }

  navigateToFormulaire() {
  this.router.navigate(['/formulaire1']);
}
}
