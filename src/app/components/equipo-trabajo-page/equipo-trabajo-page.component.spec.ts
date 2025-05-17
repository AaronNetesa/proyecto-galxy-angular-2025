import { ComponentFixture, TestBed } from '@angular/core/testing';
import EquipoTrabajoPageComponent from './equipo-trabajo-page.component';


describe('EquipoTrabajoComponent', () => {
  let component: EquipoTrabajoPageComponent;
  let fixture: ComponentFixture<EquipoTrabajoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipoTrabajoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipoTrabajoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
