import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Medicament } from '../models/medicament';
import { MedicamentService } from '../services/medicament.service';

@Component({
  selector: 'app-medicaments',
  imports: [ FormsModule, CommonModule],
  standalone: true,
  templateUrl: './medicaments.component.html',
  styleUrl: './medicaments.component.css'
})
export class MedicamentsComponent implements OnInit{
  medicaments: Medicament[] = [];
  searchQuery: string = '';
 
   constructor(
    private medicamentService: MedicamentService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.loadMedicaments();
  }

  loadMedicaments(): void {
    this.medicamentService.getMedicaments().subscribe(
      medicaments => this.medicaments = medicaments
    );
  }

  onMedicamentClick(medicament: Medicament): void {
    // Navigation vers la page détail
    this.router.navigate(['/medicament', medicament.nomUrl]);
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.medicamentService.searchMedicaments(this.searchQuery).subscribe(
        medicaments => this.medicaments = medicaments
      );
    } else {
      this.loadMedicaments();
    }
  }

  onFilterClick(filter: string): void {
    this.searchQuery = filter;
    this.onSearch();
  }
  // Dans votre component, ajoutez cette méthode :


  trackByMedicament(index: number, medicament: Medicament): number {
    return medicament.id;
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







