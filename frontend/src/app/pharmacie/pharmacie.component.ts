
// pharmacies.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PharmacieService } from '../services/pharmacie.service';
import { CommonModule } from '@angular/common';
import { Pharmacie } from '../models/pharmacie';

@Component({
  selector: 'app-pharmacies',
  imports : [ FormsModule, CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './pharmacie.component.html',
  styleUrls: ['./pharmacie.component.css']
})
export class PharmaciesComponent implements OnInit, OnDestroy {

  
  // Modal et formulaire
  pharmacies: Pharmacie[] = [];
  isModalOpen = false;
  pharmacieForm: FormGroup;
  private keyboardListener?: (event: KeyboardEvent) => void;
  searchQuery: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private pharmacieService: PharmacieService
  ) {
    this.pharmacieForm = this.createPharmacieForm();
  }

  ngOnInit(): void {
    this.loadPharmacie();
    this.setupKeyboardListener();
  }
  ngOnDestroy(): void {
    this.removeKeyboardListener();
  }

  /**
   * Créer le formulaire réactif pour ajouter une pharmacie
   */
  private createPharmacieForm(): FormGroup {
    return this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      adresse: ['', [Validators.required, Validators.minLength(5)]],
      quartier: ['', [Validators.required]],
      telephone: ['', [Validators.required, Validators.pattern(/^\+221\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/)]],
      horaires: ['', [Validators.required]]
    });
  }

  /**
   * Gère le clic sur une carte de pharmacie
   * @param pharmacie - L'objet pharmacie
   */
  onPharmacieClick(pharmacie: Pharmacie): void {
    this.router.navigate(['/details-pharmacie', pharmacie.nomUrl]);
  }

  /**
   * Ouvrir le modal d'ajout de pharmacie
   */
  openAddPharmacyModal(): void {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
    this.pharmacieForm.reset();
  }

  /**
   * Fermer le modal d'ajout de pharmacie
   */
  closeAddPharmacyModal(): void {
    this.isModalOpen = false;
    document.body.style.overflow = '';
    this.pharmacieForm.reset();
  }

  /**
   * Gérer le clic sur l'overlay du modal
   */
  onModalOverlayClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeAddPharmacyModal();
    }
  }

  /**
   * Soumettre le formulaire d'ajout de pharmacie
   */
  onSubmitPharmacie(): void {
    if (this.pharmacieForm.valid) {
      const nouvellePharmacieData = this.pharmacieForm.value;
      
      // Créer l'objet pharmacie complet
      const nouvellePharmarie: Pharmacie = {
        id: (this.pharmacies.length + 1).toString(),
        nom: nouvellePharmacieData.nom,
        nomUrl: this.generateNomUrl(nouvellePharmacieData.nom),
        adresse: nouvellePharmacieData.adresse,
        quartier: nouvellePharmacieData.quartier,
        telephone: nouvellePharmacieData.telephone,
        horaires: nouvellePharmacieData.horaires
      };

      console.log('Nouvelle pharmacie à ajouter:', nouvellePharmarie);

      
      this.pharmacieService.addPharmacie(nouvellePharmarie).subscribe({
        next: (response) => {
        this.loadPharmacie();                 
        this.closeAddPharmacyModal();         
        this.showSuccessMessage();              
      },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de la pharmacie:', error);
        }
      });

     
      // Simulation de notification de succès
      alert('Pharmacie ajoutée avec succès !');
    } else {
      console.log('Formulaire invalide', this.pharmacieForm.errors);
      Object.keys(this.pharmacieForm.controls).forEach(key => {
        this.pharmacieForm.get(key)?.markAsTouched();
      });
    }
  }

  
   private generateNomUrl(nom: string): string {
    return nom.toLowerCase()
             .replace(/[àáâãäå]/g, 'a')
             .replace(/[èéêë]/g, 'e')
             .replace(/[ìíîï]/g, 'i')
             .replace(/[òóôõö]/g, 'o')
             .replace(/[ùúûü]/g, 'u')
             .replace(/[ç]/g, 'c')
             .replace(/[^a-z0-9]/g, '-')
             .replace(/-+/g, '-')
             .replace(/^-|-$/g, '');
  }

  // Marquer tous les champs comme touchés pour afficher les erreurs
  private markFormGroupTouched(): void {
    Object.keys(this.pharmacieForm.controls).forEach(key => {
      this.pharmacieForm.get(key)?.markAsTouched();
    });
  }

  // Afficher un message de succès
  private showSuccessMessage(): void {
    // Remplacez par votre système de notification
    alert('Médicament ajouté avec succès !');
    // Ou utilisez un service de notification comme ngx-toastr
  }


  private setupKeyboardListener(): void {
    this.keyboardListener = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && this.isModalOpen) {
        this.closeAddPharmacyModal();
      }
    };
    document.addEventListener('keydown', this.keyboardListener);
  }

  // Suppression de l'écoute clavier
  private removeKeyboardListener(): void {
    if (this.keyboardListener) {
      document.removeEventListener('keydown', this.keyboardListener);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.pharmacieForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.pharmacieForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} est requis`;
      if (field.errors['minlength']) return `${fieldName} trop court`;
      if (field.errors['min']) return `${fieldName} doit être positif`;
    }
    return '';
  }

  loadPharmacie(): void {
    this.pharmacieService.getpharmacies().subscribe(
      pharmacies => this.pharmacies = pharmacies
    );
  }



  onSearch(): void {
      if (this.searchQuery.trim()) {
        this.pharmacieService.searchpharmacies(this.searchQuery).subscribe(
          pharmacies => this.pharmacies = pharmacies
        );
      } else {
        this.loadPharmacie();
      }
    }
  
    onFilterClick(filter: string): void {
      this.searchQuery = filter;
      this.onSearch();
    }
    // Dans votre component, ajoutez cette méthode :
  
  
    trackByMedicament(index: number, pharmacie: Pharmacie): string {
      return pharmacie.id;
    }

   navigateToHome(): void{
    this.router.navigate(['/accueil'])
  }

  navigateToMedicines(): void {
    this.router.navigate(['/pharmacie']);
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

