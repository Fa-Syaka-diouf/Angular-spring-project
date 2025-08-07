import { Routes } from '@angular/router';
import { MedicamentDetailComponent } from './details-medicaments/details-medicaments.component';
import { pharmacieDetailComponent } from './details-pharmacie/details-pharmacie.component';

export const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', loadComponent: () => import('./accueil/accueil.component').then(m => m.AccueilComponent) },
  { path: 'connexion', loadComponent: () => import('./connexion/connexion.component').then(m => m.ConnexionComponent) },
  { path: 'pharmacie', loadComponent: () => import('./pharmacie/pharmacie.component').then(m => m.PharmaciesComponent) },
  { path: 'medicaments', loadComponent: () => import('./medicaments/medicaments.component').then(m => m.MedicamentsComponent) },
  { path: 'formulaire1', loadComponent: () => import('./formulaire1/formulaire1.component').then(m => m.Formulaire1Component) },
  { path: 'formulaire2', loadComponent: () => import('./formulaire2/formulaire2.component').then(m => m.Formulaire2Component) },
  { path: 'details-medicament/:nomMedicament', component: MedicamentDetailComponent },
  { path: 'details-pharmacie/:idPharmacie', component: pharmacieDetailComponent },
  { path: '**', redirectTo: '/medicaments' },
  { path: '**', redirectTo: '/pharmacies' }
];