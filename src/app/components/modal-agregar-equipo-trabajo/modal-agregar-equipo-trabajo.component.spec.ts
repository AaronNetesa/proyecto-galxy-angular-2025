import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarEquipoTrabajoComponent } from './modal-agregar-equipo-trabajo.component';

describe('ModalAgregarEquipoTrabajoComponent', () => {
  let component: ModalAgregarEquipoTrabajoComponent;
  let fixture: ComponentFixture<ModalAgregarEquipoTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAgregarEquipoTrabajoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAgregarEquipoTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
