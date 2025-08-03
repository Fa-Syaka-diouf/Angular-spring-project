import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Pharmacie } from '../models/pharmacie';
import { PharmacieService } from '../services/pharmacie.service';

@Component({
  selector: 'app-details-pharmacies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '././details-pharmacie.component.html',
  styleUrls: ['./details-pharmacie.component.css']
})
export class pharmacieDetailComponent implements OnInit {
  pharmacie: Pharmacie | undefined;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pharmacieService: PharmacieService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const nom = params['nomUrl'];
      this.loadpharmacie(nom);
    });
  }

  loadpharmacie(nom: string): void {
    this.pharmacieService.getpharmacieByNom(nom).subscribe(
      pharmacie => {
        this.pharmacie = pharmacie;
        this.loading = false;
        
        if (!pharmacie) {
          // Rediriger si médicament non trouvé
          this.router.navigate(['/pharmacie']);
        }
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/pharmacie']);
  }

  onCommander(): void {
    if (this.pharmacie) {
      // Logique de commande - vous pouvez naviguer vers une page de commande
      console.log('Commander:', this.pharmacie.nom);
      // this.router.navigate(['/commande', this.pharmacie.nomUrl]);
    }
  }

  onLocaliser(): void {
    if (this.pharmacie) {
      // Logique pour localiser la pharmacie
      console.log('Localiser pharmacie:', this.pharmacie.quartier);
      // Vous pouvez ouvrir Google Maps ou naviguer vers une page de localisation
    }
  }

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
  modifierpharmacie(): void {
    if (this.pharmacie) {
      // Navigation vers la page d'édition
      this.router.navigate(['/pharmacie/edit', this.pharmacie.nomUrl]);

    }
  }

  /**
   * Supprimer le médicament
   */
  supprimerpharmacie(): void {
    if (this.pharmacie) {
      // Confirmation avant suppression
      const confirmation = confirm(`Êtes-vous sûr de vouloir supprimer ${this.pharmacie.nom} ?`);
      
      if (confirmation) {
        console.log('Suppression du médicament:', this.pharmacie.nom);
        
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
