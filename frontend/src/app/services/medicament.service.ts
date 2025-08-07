import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicament } from '../models/medicament';

@Injectable({
  providedIn: 'root'
})
export class MedicamentService {

  private apiUrl = 'http://localhost:8080/api/medicaments'; // à adapter selon ton backend

  constructor(private http: HttpClient) {}

  /**
   * Récupérer tous les médicaments
   */
  getAllMedicaments(): Observable<Medicament[]> {
    return this.http.get<Medicament[]>(this.apiUrl);
  }

  /**
   * Récupérer un médicament par son nom
   */
  getMedicamentByName(name: string): Observable<Medicament> {
    return this.http.get<Medicament>(`${this.apiUrl}/${name}`);
  }

  /**
   * Récupérer les médicaments par catégorie
   */
  getMedicamentsByCategory(category: string): Observable<Medicament[]> {
    return this.http.get<Medicament[]>(`${this.apiUrl}/category/${category}`);
  }

  /**
   * Récupérer toutes les catégories de médicaments
   */
  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  /**
   * Créer un nouveau médicament
   */
  createMedicament(medicament: Medicament): Observable<Medicament> {
    return this.http.post<Medicament>(this.apiUrl, medicament);
  }

  /**
   * Mettre à jour un médicament
   */
  updateMedicament(name: string, medicament: Medicament): Observable<Medicament> {
    return this.http.put<Medicament>(`${this.apiUrl}/${name}`, medicament);
  }

  /**
   * Supprimer un médicament
   */
  deleteMedicament(name: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${name}`);
  }
}
