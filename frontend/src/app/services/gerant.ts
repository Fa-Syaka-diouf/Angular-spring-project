import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Gerant } from '../models/gerant.model';

@Injectable({
  providedIn: 'root'
})
export class GerantService {
  
  private apiUrl = 'http://localhost:8080/api/gerants';
  
    constructor(private http: HttpClient) { }
  
    // GET /api/Gerant - Récupérer toutes les Gerant
    getAllGerants(): Observable<Gerant[]> {
      return this.http.get<Gerant[]>(this.apiUrl)
        .pipe(
          catchError(this.handleError)
        );
    }
  
    // GET /api/Gerant/{id} - Récupérer une Gerant par ID
    getGerantById(id: number): Observable<Gerant> {
      return this.http.get<Gerant>(`${this.apiUrl}/${id}`)
        .pipe(
          catchError(this.handleError)
        );
    }
  
    // POST /api/Gerant - Créer une nouvelle Gerant
    createGerant(Gerant: Gerant): Observable<Gerant> {
      return this.http.post<Gerant>(this.apiUrl, Gerant)
        .pipe(
          catchError(this.handleError)
        );
    }
  
    // PUT /api/Gerant/{id} - Mettre à jour une Gerant
    updateGerant(id: number, Gerant: Gerant): Observable<Gerant> {
      return this.http.put<Gerant>(`${this.apiUrl}/${id}`, Gerant)
        .pipe(
          catchError(this.handleError)
        );
    }
  
    // DELETE /api/Gerant/{id} - Supprimer une Gerant
    deleteGerant(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`)
        .pipe(
          catchError(this.handleError)
        );
    }
    // GET /api/Gerant/experience/{anneeExperience} -
    getGerantsByExperience(anneeExperience: number): Observable<Gerant[]> {
      return this.http.get<Gerant[]>(`${this.apiUrl}/experience/${anneeExperience}`)
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
