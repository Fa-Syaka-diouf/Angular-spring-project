import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMedicamentsComponent } from './details-medicaments.component';

describe('DetailsMedicamentsComponent', () => {
  let component: DetailsMedicamentsComponent;
  let fixture: ComponentFixture<DetailsMedicamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsMedicamentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsMedicamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
