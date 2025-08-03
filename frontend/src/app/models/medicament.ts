export interface Medicament {
  id: number;
  nom: string;
  nomUrl: string; // pour l'URL (doliprane, efferalgan, etc.)
  pharmacie: string;
  prix: number;
  categorie: string;
  dose: string
}
