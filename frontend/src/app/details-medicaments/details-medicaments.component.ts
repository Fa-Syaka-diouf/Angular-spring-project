import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicament } from '../models/medicament';
import { MedicamentService } from '../services/medicament.service';
import { StockMedoc } from '../models/stock-medoc.model';

@Component({
  selector: 'app-details-medicaments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '././details-medicaments.component.html',
  styleUrls: ['./details-medicaments.component.css']
})
export class MedicamentDetailComponent implements OnInit {
  medicament: Medicament | undefined;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicamentService: MedicamentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const nom = params['nomMedoc'];
      this.loadMedicament(nom);
      
    });
  }

  loadMedicament(nom: string): void {
    this.medicamentService.getMedicamentByName(nom).subscribe(
      medicament => {
        this.medicament = medicament;
        this.loading = false;
        
        if (!medicament) {
          // Rediriger si médicament non trouvé
          this.router.navigate(['/medicaments']);
        }
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/medicaments']);
  }

  onCommander(): void {
    if (this.medicament) {
      // Logique de commande - vous pouvez naviguer vers une page de commande
      console.log('Commander:', this.medicament.nomMedoc);
      // this.router.navigate(['/commande', this.medicament.nomUrl]);
    }
  }

  // onLocaliser(): void {
  //   if (this.medicament) {
  //     // Logique pour localiser la pharmacie
  //     console.log('Localiser pharmacie:', this.medicament.);
  //     // Vous pouvez ouvrir Google Maps ou naviguer vers une page de localisation
  //   }
  // }

  deconnexion(): void {
    // Logique de déconnexion
    // this.authService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Navigation vers la page d'accueil
   */
  goToHome(): void {
    this.router.navigate(['/']);
  }

  /**
   * Navigation vers les horaires
   */
  voirHoraires(): void {
    this.router.navigate(['/horaires']);
  }

  /**
   * Modifier le médicament
   */
  modifierMedicament(): void {
    if (this.medicament) {
      // Navigation vers la page d'édition
      this.router.navigate(['/medicament/edit', this.medicament.nomMedoc]);

    }
  }
  

  /**
   * Supprimer le médicament
   */
  supprimerMedicament(): void {
    if (this.medicament) {
      // Confirmation avant suppression
      const confirmation = confirm(`Êtes-vous sûr de vouloir supprimer ${this.medicament.nomMedoc} ?`);
      
      if (confirmation) {
        console.log('Suppression du médicament:', this.medicament.nomMedoc);
        
        setTimeout(() => {
          alert('Médicament supprimé avec succès !');
          this.router.navigate(['/medications']);
        }, 1000);
      }
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
