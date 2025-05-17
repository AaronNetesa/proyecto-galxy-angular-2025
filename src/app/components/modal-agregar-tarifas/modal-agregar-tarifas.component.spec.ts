import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarTarifasComponent } from './modal-agregar-tarifas.component';

describe('ModalAgregarTarifasComponent', () => {
  let component: ModalAgregarTarifasComponent;
  let fixture: ComponentFixture<ModalAgregarTarifasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAgregarTarifasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAgregarTarifasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
