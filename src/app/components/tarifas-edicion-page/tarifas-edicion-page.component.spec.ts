import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifasEdicionPageComponent } from './tarifas-edicion-page.component';

describe('TarifasEdicionPageComponent', () => {
  let component: TarifasEdicionPageComponent;
  let fixture: ComponentFixture<TarifasEdicionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarifasEdicionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarifasEdicionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
