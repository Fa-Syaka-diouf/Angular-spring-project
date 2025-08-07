import { Gerant } from './../models/gerant.model';
import { Disponibilite } from './../models/disponibilite.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PharmacieService } from '../services/pharmacie.service';
import { GerantService } from '../services/gerant';
import { DisponibiliteService } from '../services/disponibilite';
import { Pharmacie } from '../models/pharmacie.model';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pharmacies',
  imports : [ FormsModule, CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './pharmacie.component.html',
  styleUrls: ['./pharmacie.component.css']
})

export class PharmaciesComponent implements OnInit, OnDestroy {

  // Propriétés
  pharmacies: Pharmacie[] = [];
  gerants: Gerant[] = [];
  disponibilites: Disponibilite[] = [];
  isModalOpen = false;
  pharmacieForm: FormGroup;
  loading = false;
  error: string | null = null;
  searchTerm = '';
  searchQuery: string = '';
  private keyboardListener?: (event: KeyboardEvent) => void;

  // Jours de la semaine pour le dropdown
  joursDisponibles = [
    { value: 'LUNDI', label: 'Lundi' },
    { value: 'MARDI', label: 'Mardi' },
    { value: 'MERCREDI', label: 'Mercredi' },
    { value: 'JEUDI', label: 'Jeudi' },
    { value: 'VENDREDI', label: 'Vendredi' },
    { value: 'SAMEDI', label: 'Samedi' },
    { value: 'DIMANCHE', label: 'Dimanche' }
  ];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private pharmacieService: PharmacieService,
    private gerantService: GerantService,
    private disponibiliteService: DisponibiliteService
  ) {
    this.pharmacieForm = this.createPharmacieForm();
  }
  ngOnInit(): void {
    this.loadPharmacies();
    this.loadGerants();
    this.loadDisponibilites();
    this.setupKeyboardListener();
  }

  ngOnDestroy(): void {
    this.removeKeyboardListener();
  }

  /**
   * Charger toutes les pharmacies
   */
  loadPharmacies(): void {
    this.loading = true;
    this.error = null;
    
    this.pharmacieService.getAllPharmacies().subscribe({
      next: (data) => {
        this.pharmacies = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
        console.error('Erreur lors du chargement des pharmacies:', error);
      }
    });
  }

  /**
   * Charger tous les gérants
   */
  loadGerants(): void {
    this.gerantService.getAllGerants().subscribe({
      next: (gerants) => {
        this.gerants = gerants;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des gérants:', error);
      }
    });
  }
  loadDisponibilites(): void {
    this.disponibiliteService.getAllDisponibilites().subscribe({
      next: (disponibilites) => {
        this.disponibilites = disponibilites;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des disponibilités:', error);
      }
    });}

  /**
   * Créer le formulaire réactif pour ajouter une pharmacie
   */
  private createPharmacieForm(): FormGroup {
    return this.formBuilder.group({
      nomPharmacie: ['', [Validators.required, Validators.minLength(3)]],
      adressePharmacie: ['', [Validators.required, Validators.minLength(5)]],
      contactTelephonique: ['', [Validators.required, Validators.pattern(/^\+221\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/)]],
      idGerant: [null],
      latitude: [null],
      longitude: [null],
      disponibilites: this.formBuilder.array([], [Validators.required, this.atLeastOneDisponibiliteValidator])
    });
  }

  /**
   * Getter pour récupérer le FormArray des disponibilités
   */
  get disponibilitesFormArray(): FormArray {
    return this.pharmacieForm.get('disponibilites') as FormArray;
  }

  /**
   * Créer un FormGroup pour une disponibilité
   */
  private createDisponibiliteFormGroup(): FormGroup {
    return this.formBuilder.group({
      jour: ['', [Validators.required]],
      horaireOuverture: ['', [Validators.required]],
      horaireFermeture: ['', [Validators.required]]
    }, { validators: this.heuresValidator });
  }

  /**
   * Ajouter une nouvelle disponibilité
   */
  addDisponibilite(): void {
    this.disponibilitesFormArray.push(this.createDisponibiliteFormGroup());
  }

  /**
   * Supprimer une disponibilité par index
   */
  removeDisponibilite(index: number): void {
    if (this.disponibilitesFormArray.length > 1) {
      this.disponibilitesFormArray.removeAt(index);
    }
  }

  /**
   * Validators personnalisés
  //  */
  // private latitudeValidator(control: AbstractControl): {[key: string]: any} | null {
  //   const value = parseFloat(control.value);
  //   if (isNaN(value) || value < -90 || value > 90) {
  //     return { 'invalidLatitude': { value: control.value } };
  //   }
  //   return null;
  // }

  // private longitudeValidator(control: AbstractControl): {[key: string]: any} | null {
  //   const value = parseFloat(control.value);
  //   if (isNaN(value) || value < -180 || value > 180) {
  //     return { 'invalidLongitude': { value: control.value } };
  //   }
  //   return null;
  // }

  private atLeastOneDisponibiliteValidator(formArray: AbstractControl): {[key: string]: any} | null {
    const array = formArray as FormArray;
    return array.length > 0 ? null : { 'atLeastOneRequired': true };
  }

  private heuresValidator(group: AbstractControl): {[key: string]: any} | null {
    const ouverture = group.get('horaireOuverture')?.value;
    const fermeture = group.get('horaireFermeture')?.value;
    
    if (ouverture && fermeture && ouverture >= fermeture) {
      return { 'invalidTimeRange': true };
    }
    return null;
  }

  /**
   * Gère le clic sur une carte de pharmacie
   */
  onPharmacieClick(pharmacie: Pharmacie): void {
    this.router.navigate(['/details-pharmacie', pharmacie.idPharmacie]);
  }

  /**
   * Ouvrir le modal d'ajout de pharmacie
   */
  openAddPharmacyModal(): void {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
    this.pharmacieForm.reset();
    
    // Réinitialiser le FormArray des disponibilités
    while (this.disponibilitesFormArray.length !== 0) {
      this.disponibilitesFormArray.removeAt(0);
    }
    
    // Ajouter une disponibilité par défaut
    this.addDisponibilite();
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
    const formValue = this.pharmacieForm.value;

const disponibilitesForm = formValue.disponibilites.map((d: any) => ({
  jour: d.jour,
  horaireOuverture: d.horaireOuverture,
  horaireFermeture: d.horaireFermeture
}));

this.gerantService.getGerantById(parseInt(formValue.idGerant)).subscribe((gerant: Gerant) => {
  if (!gerant) {
    this.showErrorMessage('Gérant non trouvé');
    return;
  }
  console.log('Gérant trouvé:', gerant);
  const nouvellePharmacieSansId: Pharmacie = {
    nomPharmacie: formValue.nomPharmacie,
    contactTelephonique: formValue.contactTelephonique,
    idGerant: parseInt(formValue.idGerant),
    gerant: gerant,
    latitude: 10, // Valeur par défaut, peut être modifiée
    longitude: 10, // Valeur par défaut, peut être modifiée
    adressePharmacie: formValue.adressePharmacie,
    disponibilites: [] 
  };
  console.log('Nouvelle pharmacie sans ID:', nouvellePharmacieSansId);
    this.pharmacieService.createPharmacie(nouvellePharmacieSansId).subscribe({
      next: (pharmacieCreee) => {
        console.log("pharmacie cree",pharmacieCreee);
        const idPharmacie = pharmacieCreee.idPharmacie;
        const disponibilitesAvecId = disponibilitesForm.map((d: any) => ({
          ...d,
          idPharmacie: idPharmacie
        }));
        const disponibiliteObservables = disponibilitesAvecId.map((d: any) =>
          this.disponibiliteService.createDisponibilite(d as Disponibilite)
        );

        forkJoin<Disponibilite[]>(disponibiliteObservables).subscribe({
          next: (disponibilitesCreees: Disponibilite[]) => {
            pharmacieCreee.disponibilites = disponibilitesCreees;
            this.pharmacies.push(pharmacieCreee);
            this.showSuccessMessage('Pharmacie ajoutée avec succès');
            this.closeAddPharmacyModal();
          },
          error: (err) => {
            console.error('Erreur lors de la création des disponibilités:', err);
            this.showErrorMessage('Erreur lors de la création des disponibilités');
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors de la création de la pharmacie:', err);
        this.showErrorMessage('Erreur lors de la création de la pharmacie');
      }
    });
});


  } else {
    console.log('Formulaire invalide', this.pharmacieForm.errors);
    this.markFormGroupTouched();
  }
}

  /**
   * Marquer tous les champs comme touchés pour afficher les erreurs
   */
  private markFormGroupTouched(): void {
    Object.keys(this.pharmacieForm.controls).forEach(key => {
      const control = this.pharmacieForm.get(key);
      control?.markAsTouched();
      
      if (control instanceof FormArray) {
        control.controls.forEach(item => {
          if (item instanceof FormGroup) {
            Object.keys(item.controls).forEach(subKey => {
              item.get(subKey)?.markAsTouched();
            });
          }
        });
      }
    });
  }

  /**
   * Configuration de l'écoute clavier
   */
  private setupKeyboardListener(): void {
    this.keyboardListener = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && this.isModalOpen) {
        this.closeAddPharmacyModal();
      }
    };
    document.addEventListener('keydown', this.keyboardListener);
  }

  /**
   * Suppression de l'écoute clavier
   */
  private removeKeyboardListener(): void {
    if (this.keyboardListener) {
      document.removeEventListener('keydown', this.keyboardListener);
    }
  }

  /**
   * Vérifier si un champ est invalide
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.pharmacieForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  /**
   * Vérifier si un champ de disponibilité est invalide
   */
  isDisponibiliteFieldInvalid(index: number, fieldName: string): boolean {
    const field = this.disponibilitesFormArray.at(index).get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  /**
   * Obtenir l'erreur d'un champ
   */
  getFieldError(fieldName: string): string {
    const field = this.pharmacieForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) return `${this.getFieldLabel(fieldName)} est requis`;
      if (field.errors['minlength']) return `${this.getFieldLabel(fieldName)} trop court`;
      if (field.errors['pattern']) return this.getPatternError(fieldName);
      if (field.errors['invalidLatitude']) return 'Latitude doit être entre -90 et 90';
      if (field.errors['invalidLongitude']) return 'Longitude doit être entre -180 et 180';
      if (field.errors['atLeastOneRequired']) return 'Au moins une disponibilité est requise';
    }
    return '';
  }

  /**
   * Obtenir l'erreur d'un champ de disponibilité
   */
  getDisponibiliteFieldError(index: number, fieldName: string): string {
    const disponibiliteGroup = this.disponibilitesFormArray.at(index);
    const field = disponibiliteGroup.get(fieldName);
    
    if (field && field.errors && field.touched) {
      if (field.errors['required']) return `${this.getFieldLabel(fieldName)} est requis`;
    }
    
    // Vérifier les erreurs au niveau du groupe
    if (disponibiliteGroup.errors && disponibiliteGroup.errors['invalidTimeRange']) {
      return 'L\'heure de fermeture doit être après l\'heure d\'ouverture';
    }
    
    return '';
  }

  /**
   * Obtenir le libellé d'un champ
   */
  private getFieldLabel(fieldName: string): string {
    const labels: {[key: string]: string} = {
      'nomPharmacie': 'Nom de la pharmacie',
      'adressePharmacie': 'Adresse',
      'contactTelephonique': 'Téléphone',
      'idGerant': 'Gérant',
      'latitude': 'Latitude',
      'longitude': 'Longitude',
      'jour': 'Jour',
      'horaireOuverture': 'Heure d\'ouverture',
      'horaireFermeture': 'Heure de fermeture'
    };
    return labels[fieldName] || fieldName;
  }

  /**
   * Obtenir l'erreur de pattern spécifique
   */
  private getPatternError(fieldName: string): string {
    if (fieldName === 'contactTelephonique') {
      return 'Format de téléphone invalide (+221 XX XXX XX XX)';
    }
    return 'Format invalide';
  }

  /**
   * Afficher un message de succès
   */
  private showSuccessMessage(message: string): void {
    // Remplacez par votre système de notification
    alert(message);
    // Ou utilisez un service de notification comme ngx-toastr
    // this.toastr.success(message);
  }

  /**
   * Afficher un message d'erreur
   */
  private showErrorMessage(message: string): void {
    // Remplacez par votre système de notification
    alert(message);
    // Ou utilisez un service de notification comme ngx-toastr
    // this.toastr.error(message);
  }

  /**
   * Recherche de pharmacies
   */
  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.pharmacieService.searchPharmaciesByName(this.searchQuery).subscribe({
        next: (pharmacies) => this.pharmacies = pharmacies,
        error: (error) => console.error('Erreur lors de la recherche:', error)
      });
    } else {
      this.loadPharmacies();
    }
  }

  /**
   * Filtrer par critère
   */
  onFilterClick(filter: string): void {
    this.searchQuery = filter;
    this.onSearch();
  }

  /**
   * Obtenir le nom complet d'un gérant
   */
  getGerantNomComplet(idGerant: number): string {
    const gerant = this.gerants.find(g => g.idGerant === idGerant);
    return gerant ? `${gerant.prenomGerant} ${gerant.nomGerant}` : 'Gérant inconnu';
  }

  /**
   * Vérifier si un jour est déjà sélectionné
   */
  isJourAlreadySelected(currentIndex: number, jour: string): boolean {
    return this.disponibilitesFormArray.controls.some((control, index) => 
      index !== currentIndex && control.get('jour')?.value === jour
    );
  }

  /**
   * Obtenir les jours disponibles pour un index donné
   */
  getJoursDisponibles(currentIndex: number): {value: string, label: string}[] {
    return this.joursDisponibles.filter(jour => 
      !this.isJourAlreadySelected(currentIndex, jour.value)
    );
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
    




