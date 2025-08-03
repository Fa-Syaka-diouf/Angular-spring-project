
export interface Pharmacie {
  id: string;
  nom: string;
  nomUrl: string;
  adresse: string;
  quartier: string;
  telephone: string;
  horaires: string;
  latitude?: number;
  longitude?: number;
  image?: string;
}
