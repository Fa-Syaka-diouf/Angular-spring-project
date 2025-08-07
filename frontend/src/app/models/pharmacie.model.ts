
// export interface Pharmacie {
//   id: string;
//   nom: string;
//   nomUrl: string;
//   adresse: string;
//   quartier: string;
//   telephone: string;
//   horaires: string;
//   latitude?: number;
//   longitude?: number;
//   image?: string;
// }

import { Gerant } from './gerant.model';
import { Disponibilite } from './disponibilite.model';

export interface Pharmacie {
  idPharmacie?: number;
  nomPharmacie: string;
  contactTelephonique: string;
  idGerant: number;
  gerant: Gerant;
  latitude: number;           // BigDecimal → number en TypeScript
  longitude: number;          // BigDecimal → number en TypeScript
  adressePharmacie: string;
  disponibilites: Disponibilite[];
}

