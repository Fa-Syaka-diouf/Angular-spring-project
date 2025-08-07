export interface Acheter {
  idClient: number;
  nomMedoc: string;
  dateAchat: string;   // LocalDate → string ("YYYY-MM-DD")
  quantite: number;
}
