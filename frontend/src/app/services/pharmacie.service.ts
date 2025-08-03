import { Injectable } from '@angular/core';
import { Pharmacie } from '../models/pharmacie';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PharmacieService {


   private pharmacies: Pharmacie[] = [
    {
      id: '1',
      nom: 'PHARMACIE ALAMARES',
      nomUrl: 'pharmacie-alamares',
      adresse: '123 Avenue des Almadies',
      quartier: 'almadies',
      telephone: '+221 33 123 45 67',
      horaires: '08h00 - 20h00',
      latitude: 14.7167,
      longitude: -17.4677
    },
    {
      id: '2',
      nom: 'PHARMACIE LOVE',
      nomUrl: 'pharmacie-love',
      adresse: '45 Rue de Yoff',
      quartier: 'yoff',
      telephone: '+221 33 234 56 78',
      horaires: '07h30 - 19h30',
      latitude: 14.7500,
      longitude: -17.4833
    },
    {
      id: '3',
      nom: 'PHARMACIE OUEST FOIRE',
      nomUrl: 'pharmacie-ouest-foire',
      adresse: '78 Boulevard de la République',
      quartier: 'medina',
      telephone: '+221 33 345 67 89',
      horaires: '08h00 - 18h00',
      latitude: 14.6928,
      longitude: -17.4467
    },
    {
      id: '4',
      nom: 'PHARMACIE MANAN',
      nomUrl: 'pharmacie-manan',
      adresse: '92 Avenue Cheikh Anta Diop',
      quartier: 'point-e',
      telephone: '+221 33 456 78 90',
      horaires: '09h00 - 21h00',
      latitude: 14.7000,
      longitude: -17.4500
    },
    {
      id: '5',
      nom: 'PHARMACIE CENTRALE',
      nomUrl: 'pharmacie-centrale',
      adresse: '15 Place de l\'Indépendance',
      quartier: 'plateau',
      telephone: '+221 33 567 89 01',
      horaires: '24h/24',
      latitude: 14.6937,
      longitude: -17.4441
    },
    {
      id: '6',
      nom: 'PHARMACIE SACRÉ-CŒUR',
      nomUrl: 'pharmacie-sacre-coeur',
      adresse: '67 Rue de Sacré-Cœur',
      quartier: 'sacre-coeur',
      telephone: '+221 33 678 90 12',
      horaires: '08h30 - 19h00',
      latitude: 14.7200,
      longitude: -17.4600
    }
  ];


  getpharmacies(): Observable<Pharmacie[]> {
      return of(this.pharmacies);
    }
  
    getpharmacieByNom(nom: string): Observable<Pharmacie | undefined> {
      const pharmacie = this.pharmacies.find(m => m.nomUrl === nom);
      return of(pharmacie);
    }
  
    searchpharmacies(query: string): Observable<Pharmacie[]> {
      const filtered = this.pharmacies.filter(m => 
        m.nom.toLowerCase().includes(query.toLowerCase()) ||
        m.quartier.toLowerCase().includes(query.toLowerCase())
      );
      return of(filtered);
    }
  
    addPharmacie(pharmacie: Pharmacie): Observable<Pharmacie> {
    this.pharmacies.push(pharmacie);
    return of(pharmacie);
  }
  

}
