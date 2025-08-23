import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialCitaPage } from './historial-cita.page';

describe('HistorialCitaPage', () => {
  let component: HistorialCitaPage;
  let fixture: ComponentFixture<HistorialCitaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialCitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
