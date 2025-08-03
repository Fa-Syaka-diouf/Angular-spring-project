
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Medicament } from '../models/medicament';

@Injectable({
  providedIn: 'root'
})
export class MedicamentService {
  
  private medicaments: Medicament[] = [
    {
      id: 1,
      nom: 'DOLIPRANE',
      nomUrl: 'doliprane',
      pharmacie: 'Pharmacie ALAMARES',
      prix: 2500,
      categorie: 'Antalgique et antipyrétique utilisé pour traiter la douleur et la fièvre.',
      dose: '1000 Mg'
    },
    {
      id: 2,
      nom: 'EFFERALGAN',
      nomUrl: 'efferalgan',
      pharmacie: 'Pharmacie LOVE',
      prix: 3000,
      categorie: 'Paracétamol sous forme effervescente pour un soulagement rapide.',
      dose : '500 g'
    },
    {
      id: 3,
      nom: 'AMOXICILLINE',
      nomUrl: 'amoxicilline',
      pharmacie: 'Pharmacie OUEST FOIRE',
      prix: 4500,
      categorie: 'Antibiotique de la famille des pénicillines.',
      dose: '500 mg'
    },
    {
      id: 4,
      nom: 'FERVEX',
      nomUrl: 'fervex',
      pharmacie: 'Pharmacie ALAMARES',
      prix: 3500,
      categorie: 'Traitement symptomatique du rhume et des états grippaux.',
      dose: '1000 Mg'
    },
    {
      id: 5,
      nom: 'IBUPROFENE',
      nomUrl: 'ibuprofene',
      pharmacie: 'Pharmacie MANAN',
      prix: 2800,
      categorie: 'Anti-inflammatoire non stéroïdien (AINS).',
      dose : '200 Mg'
    },
    {
      id: 6,
      nom: 'AUGMENTIN',
      nomUrl: 'augmentin',
      pharmacie: 'Pharmacie ALAMARES',
      prix: 6500,
      categorie: 'Antibiotique à spectre élargi.',
      dose: '500 Mg'
    }
  ];

  getMedicaments(): Observable<Medicament[]> {
    return of(this.medicaments);
  }

  getMedicamentByNom(nom: string): Observable<Medicament | undefined> {
    const medicament = this.medicaments.find(m => m.nomUrl === nom);
    return of(medicament);
  }

  searchMedicaments(query: string): Observable<Medicament[]> {
    const filtered = this.medicaments.filter(m => 
      m.nom.toLowerCase().includes(query.toLowerCase()) ||
      m.categorie.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered);
  }

  addMedicament(medicament: Medicament): Observable<Medicament> {
  this.medicaments.push(medicament);
  return of(medicament);
}



}
