import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pharmacie } from '../models/pharmacie.model';

@Injectable({
  providedIn: 'root'
})
export class PharmacieService {

private apiUrl = 'http://localhost:8080/api/pharmacies';

  constructor(private http: HttpClient) { }

  // GET /api/pharmacies - Récupérer toutes les pharmacies
  getAllPharmacies(): Observable<Pharmacie[]> {
    return this.http.get<Pharmacie[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // GET /api/pharmacies/{id} - Récupérer une pharmacie par ID
  getPharmacieById(id: number): Observable<Pharmacie> {
    return this.http.get<Pharmacie>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // POST /api/pharmacies - Créer une nouvelle pharmacie
  createPharmacie(pharmacie: Pharmacie): Observable<Pharmacie> {
    return this.http.post<Pharmacie>(this.apiUrl, pharmacie)
      .pipe(
        catchError(this.handleError)
      );
  }

  // PUT /api/pharmacies/{id} - Mettre à jour une pharmacie
  updatePharmacie(id: number, pharmacie: Pharmacie): Observable<Pharmacie> {
    return this.http.put<Pharmacie>(`${this.apiUrl}/${id}`, pharmacie)
      .pipe(
        catchError(this.handleError)
      );
  }

  // DELETE /api/pharmacies/{id} - Supprimer une pharmacie
  deletePharmacie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // GET /api/pharmacies/search?name={name} - Rechercher par nom
  searchPharmaciesByName(name: string): Observable<Pharmacie[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<Pharmacie[]>(`${this.apiUrl}/search`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  // GET /api/pharmacies/medicament/{medicamentName} - Pharmacies avec un médicament
  getPharmaciesWithMedicament(medicamentName: string): Observable<Pharmacie[]> {
    return this.http.get<Pharmacie[]>(`${this.apiUrl}/medicament/${medicamentName}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Gestion des erreurs
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur inconnue est survenue!';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
  

}
