import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Pharmacie } from '../models/pharmacie.model';
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
      const idPharmacie = params['idPharmacie'];
      this.loadpharmacie(idPharmacie);
    });
  }

  loadpharmacie(id: number): void {
    this.pharmacieService.getPharmacieById(id).subscribe(
      pharmacie => {
        this.pharmacie = pharmacie;
        this.loading = false;
        
        if (!pharmacie) {
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
      console.log('Commander:', this.pharmacie.nomPharmacie);
      // this.router.navigate(['/commande', this.pharmacie.nomUrl]);
    }
  }

  onLocaliser(): void {
    if (this.pharmacie) {
      // Logique pour localiser la pharmacie
      console.log('Localiser pharmacie:', this.pharmacie.adressePharmacie);
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
      this.router.navigate(['/pharmacie/edit', this.pharmacie.nomPharmacie]);

    }
  }

  supprimerpharmacie(): void {
    if (this.pharmacie) {
      const confirmation = confirm(`Êtes-vous sûr de vouloir supprimer ${this.pharmacie.nomPharmacie} ?`);
      
      if (confirmation) {
      
        this.pharmacieService.deletePharmacie(this.pharmacie.idPharmacie!).subscribe({
           next: (pharmacie) => {
              console.log('Suppression de la pharmacie');
            },
            error: (error) => {
              console.error('Erreur lors de la création de la pharmacie:', error);
            }
          });


        setTimeout(() => {
          alert('pharmacie supprimé avec succès !');
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
