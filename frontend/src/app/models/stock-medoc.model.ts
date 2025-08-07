export interface StockMedoc {
  idPharmacie: number;
  nomMedoc: string;
  quantite: number;
  prix: number;              // BigDecimal → number
}
