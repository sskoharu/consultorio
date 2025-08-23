import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialCitaPacientePage } from './historial-cita-paciente.page';

describe('HistorialCitaPacientePage', () => {
  let component: HistorialCitaPacientePage;
  let fixture: ComponentFixture<HistorialCitaPacientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialCitaPacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
