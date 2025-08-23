import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActualizarPacientePage } from './actualizar-paciente.page';


describe('ActualizarPacientePage', () => {
  let component: ActualizarPacientePage;
  let fixture: ComponentFixture<ActualizarPacientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarPacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
