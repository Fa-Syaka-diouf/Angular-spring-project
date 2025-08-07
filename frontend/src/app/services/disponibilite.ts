import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Disponibilite } from '../models/disponibilite.model';

@Injectable({
  providedIn: 'root'
})
export class DisponibiliteService {
  private apiUrl = 'http://localhost:8080/api/disponibilites';

  constructor(private http: HttpClient) { }

  // GET /api/disponibilites - Récupérer toutes les disponibilités
  getAllDisponibilites(): Observable<Disponibilite[]> {
    return this.http.get<Disponibilite[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }
   // POST /api/pharmacies - Créer une nouvelle pharmacie
    createDisponibilite(disponibilite: Disponibilite): Observable<Disponibilite> {
      return this.http.post<Disponibilite>(this.apiUrl, disponibilite)
        .pipe(
          catchError(this.handleError)
        );
    }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  
}
