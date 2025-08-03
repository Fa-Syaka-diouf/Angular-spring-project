import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  
  popularMedicines = [
    { name: 'Doliprane', active: false },
    { name: 'Vitamine c', active: false },
    { name: 'Ibuprofène', active: false },
    { name: 'Antadys', active: false }
  ];

  searchQuery = '';

  constructor(private router: Router) { }

  onSearchMedicine(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }

  onMedicineClick(medicine: any): void {
    this.popularMedicines.forEach(med => med.active = false);
    medicine.active = true;
    this.router.navigate(['/search'], { queryParams: { q: medicine.name } });
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