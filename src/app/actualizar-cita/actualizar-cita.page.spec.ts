import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActualizarCitaPage } from './actualizar-cita.page';

describe('ActualizarCitaPage', () => {
  let component: ActualizarCitaPage;
  let fixture: ComponentFixture<ActualizarCitaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarCitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
