import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formulaire1Component } from './formulaire1.component';

describe('Formulaire1Component', () => {
  let component: Formulaire1Component;
  let fixture: ComponentFixture<Formulaire1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formulaire1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formulaire1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
