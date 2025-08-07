import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Medicament } from '../models/medicament';
import { MedicamentService } from '../services/medicament.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { StockMedoc } from '../models/stock-medoc.model';
import { StockMedocService } from '../services/stock-medoc.service';
import { PharmacieService } from '../services/pharmacie.service';
import { Pharmacie } from '../models/pharmacie.model';

@Component({
  selector: 'app-medicaments',
  imports: [ FormsModule, CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './medicaments.component.html',
  styleUrl: './medicaments.component.css'
})
export class MedicamentsComponent implements OnInit, OnDestroy{
  medicaments: Medicament[] = [];
  pharmacies: Pharmacie[] = [];
  stockmedocs: StockMedoc[] = [];
  isModalOpen = false;
  medicamentForm: FormGroup;
  private keyboardListener?: (event: KeyboardEvent) => void;
  searchQuery: string = '';

 
   constructor(
    private medicamentService: MedicamentService,
    private stockMedocService: StockMedocService,
    private pharmacieService: PharmacieService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.medicamentForm = this.formBuilder.group({
      nomMedoc: ['', [Validators.required, Validators.minLength(2)]],
      idPharmacie: [null, [Validators.required]],
      prix: ['', [Validators.required, Validators.min(0)]],
      quantite: ['', [Validators.required, Validators.min(1)]],
      categorie: ['', [Validators.required, Validators.minLength(2)]]
    });
  }


  ngOnInit(): void {
    this.loadPharmacies();
    this.loadMedicaments();
    this.loadStockMedocs();
    this.setupKeyboardListener();
  }

  ngOnDestroy(): void {
    this.removeKeyboardListener();
  }



   openAddMedicationModal(): void {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
    this.medicamentForm.reset();
    console.log('isModalOpen:', this.isModalOpen);
  }

  // Fermer le modal
  closeAddMedicationModal(): void {
    this.isModalOpen = false;
    document.body.style.overflow = '';
    this.medicamentForm.reset();
  }

  onSubmitMedicament(): void {
    if (this.medicamentForm.valid) {
      const formValue = this.medicamentForm.value;
      
      const newMedicament: Medicament = {
        nomMedoc: formValue.nomMedoc,
        categorie: formValue.categorie
      };
      console.log("newMedicament:", newMedicament);

      const newStock: StockMedoc = {
        idPharmacie: formValue.idPharmacie,
        nomMedoc: formValue.nomMedoc,
        quantite: formValue.quantite,
        prix: formValue.prix,
      };
      console.log("newStock:", newStock);
      
      this.medicamentService.createMedicament(newMedicament).subscribe({
      next: (response) => {
        console.log('Médicament créé:', response);
        this.stockMedocService.createStock(newStock).subscribe({
          next: (stockResponse) => {},

          error: (error) => {console.error('Erreur lors de la création du stock:', error);}
           }); 

        this.loadMedicaments();                 
        this.closeAddMedicationModal();         
        this.showSuccessMessage();              
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout:', error);
        alert('Erreur lors de l\'ajout du médicament. Veuillez réessayer.');
      }
    });


    } else {
      this.markFormGroupTouched();
    }
  }


  // Marquer tous les champs comme touchés pour afficher les erreurs
  private markFormGroupTouched(): void {
    Object.keys(this.medicamentForm.controls).forEach(key => {
      this.medicamentForm.get(key)?.markAsTouched();
    });
  }

  // Afficher un message de succès
  private showSuccessMessage(): void {
    // Remplacez par votre système de notification
    alert('Médicament ajouté avec succès !');
    // Ou utilisez un service de notification comme ngx-toastr
  }

  

  // Fermer le modal en cliquant sur l'overlay
  onModalOverlayClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeAddMedicationModal();
    }
  }

  // Configuration de l'écoute clavier
  private setupKeyboardListener(): void {
    this.keyboardListener = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && this.isModalOpen) {
        this.closeAddMedicationModal();
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
    const field = this.medicamentForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.medicamentForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} est requis`;
      if (field.errors['minlength']) return `${fieldName} trop court`;
      if (field.errors['min']) return `${fieldName} doit être positif`;
    }
    return '';
  }


loadPharmacies(): void {
    
    this.pharmacieService.getAllPharmacies().subscribe({
      next: (data) => {
        this.pharmacies = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des pharmacies:', error);
      }
    });
  }

  loadMedicaments(): void {
    this.medicamentService.getAllMedicaments().subscribe(
      medicaments => this.medicaments = medicaments
    );
  }
  loadStockMedocs(): void {
    this.stockMedocService.getAllStocks().subscribe(
      stockmedocs => this.stockmedocs = stockmedocs)  
    ;   
  }

  onMedicamentClick(medicament: Medicament): void {
    // Navigation vers la page détail
    this.router.navigate(['/details-medicament', medicament.nomMedoc]);
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














