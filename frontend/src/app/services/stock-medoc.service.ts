import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockMedoc } from '../models/stock-medoc.model';
@Injectable({
  providedIn: 'root'
})
export class StockMedocService {

  private apiUrl = 'http://localhost:8080/api/stocks';

  constructor(private http: HttpClient) { }

  /** Récupérer tous les stocks */
  getAllStocks(): Observable<StockMedoc[]> {
    return this.http.get<StockMedoc[]>(this.apiUrl);
  }

  /** Récupérer les stocks d'une pharmacie */
  getStockByPharmacie(idPharmacie: number): Observable<StockMedoc[]> {
    return this.http.get<StockMedoc[]>(`${this.apiUrl}/pharmacie/${idPharmacie}`);
  }

  /** Récupérer les stocks pour un médicament */
  getStockByMedicament(nomMedoc: string): Observable<StockMedoc[]> {
    return this.http.get<StockMedoc[]>(`${this.apiUrl}/medicament/${nomMedoc}`);
  }

  /** Récupérer uniquement les médicaments disponibles (quantité > 0) dans une pharmacie */
  getAvailableStock(idPharmacie: number): Observable<StockMedoc[]> {
    return this.http.get<StockMedoc[]>(`${this.apiUrl}/available/${idPharmacie}`);
  }

  /** Créer un nouveau stock */
  createStock(stock: StockMedoc): Observable<StockMedoc> {
    return this.http.post<StockMedoc>(this.apiUrl, stock);
  }

  /** Mettre à jour un stock existant */
  updateStock(stock: StockMedoc): Observable<StockMedoc> {
    return this.http.put<StockMedoc>(`${this.apiUrl}/${stock.idPharmacie}/${stock.nomMedoc}`, stock);
  }

  /** Supprimer un stock */
  deleteStock(idPharmacie: number, nomMedoc: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idPharmacie}/${nomMedoc}`);
  }
}
