import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    RouterLinkActive,  // ← Ajouté si vous l'utilisez
    RouterLink,        // ← Ajouté si vous l'utilisez
    CommonModule, 
    FormsModule
  ],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Votre code de composant
  protected readonly title = signal('frontend');
  

  searchQuery = '';

  constructor(private router: Router) { }

   onSearchMedicine(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }

 

  navigateToHome(): void{
    this.router.navigate(['/accueil'])
  }

  navigateToMedicines(): void {
    this.router.navigate(['/medicaments']);
  }

  navigateToMap(): void {
    this.router.navigate(['/map']);
  }

  navigateToPharmacySearch(): void {
    this.router.navigate(['/pharmacie']);
  }
  navigateToConnexion() {
  this.router.navigate(['/connexion']);

  
}

navigateToFormulaire() {
  this.router.navigate(['/formulaire1']);
}
}




