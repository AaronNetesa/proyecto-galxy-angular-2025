import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoTrabajoComponent } from './equipo-trabajo.component';

describe('EquipoTrabajoComponent', () => {
  let component: EquipoTrabajoComponent;
  let fixture: ComponentFixture<EquipoTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipoTrabajoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipoTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
