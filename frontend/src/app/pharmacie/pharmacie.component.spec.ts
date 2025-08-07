import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PharmaciesComponent } from './pharmacie.component';


describe('PharmaciesComponent', () => {
  let component: PharmaciesComponent;
  let fixture: ComponentFixture<PharmaciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmaciesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmaciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
