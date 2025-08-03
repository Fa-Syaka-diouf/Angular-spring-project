import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicament } from '../models/medicament';
import { MedicamentService } from '../services/medicament.service';

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
      const nom = params['nom'];
      this.loadMedicament(nom);
    });
  }

  loadMedicament(nom: string): void {
    this.medicamentService.getMedicamentByNom(nom).subscribe(
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
      console.log('Commander:', this.medicament.nom);
      // this.router.navigate(['/commande', this.medicament.nomUrl]);
    }
  }

  onLocaliser(): void {
    if (this.medicament) {
      // Logique pour localiser la pharmacie
      console.log('Localiser pharmacie:', this.medicament.pharmacie);
      // Vous pouvez ouvrir Google Maps ou naviguer vers une page de localisation
    }
  }
}
