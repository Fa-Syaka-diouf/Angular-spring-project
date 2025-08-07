export interface Disponibilite {
  id: number;
  jour: string;
  horaireOuverture: string;  // LocalTime → string ("HH:mm:ss")
  horaireFermeture: string;  // LocalTime → string ("HH:mm:ss")
  idPharmacie: number;
}
