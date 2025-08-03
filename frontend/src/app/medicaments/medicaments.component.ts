import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Medicament } from '../models/medicament';
import { MedicamentService } from '../services/medicament.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-medicaments',
  imports: [ FormsModule, CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './medicaments.component.html',
  styleUrl: './medicaments.component.css'
})
export class MedicamentsComponent implements OnInit, OnDestroy{
  medicaments: Medicament[] = [];
  isModalOpen = false;
  medicamentForm: FormGroup;
  private keyboardListener?: (event: KeyboardEvent) => void;
  searchQuery: string = '';

 
   constructor(
    private medicamentService: MedicamentService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.medicamentForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      pharmacie: ['', [Validators.required, Validators.minLength(2)]],
      prix: ['', [Validators.required, Validators.min(0)]],
      categorie: ['', [Validators.required, Validators.minLength(2)]],
      dose: ['', [Validators.required]]
    });
  }


  ngOnInit(): void {
    this.loadMedicaments();
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
        id: this.generateNewId(),
        nom: formValue.nom.trim(),
        nomUrl: this.generateNomUrl(formValue.nom),
        pharmacie: formValue.pharmacie.trim(),
        prix: parseInt(formValue.prix),
        categorie: formValue.categorie.trim(),
        dose: formValue.dose.trim()
      };

      
      this.medicamentService.addMedicament(newMedicament).subscribe({
      next: (response) => {
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

  // Générer un nouvel ID
  private generateNewId(): number {
    return this.medicaments.length > 0 
      ? Math.max(...this.medicaments.map(m => m.id)) + 1 
      : 1;
  }

  // Générer l'URL du nom
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




  loadMedicaments(): void {
    this.medicamentService.getMedicaments().subscribe(
      medicaments => this.medicaments = medicaments
    );
  }

  onMedicamentClick(medicament: Medicament): void {
    // Navigation vers la page détail
    this.router.navigate(['/details-medicament', medicament.nomUrl]);
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














