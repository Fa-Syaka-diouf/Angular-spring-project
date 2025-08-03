import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulaire1',
  templateUrl: './formulaire1.component.html',
  styleUrls: ['./formulaire1.component.css'] 
})
export class Formulaire1Component {
  constructor(private router: Router) {} 

  goToNextStep() {
    this.router.navigate(['/formulaire2']);
  }
}
