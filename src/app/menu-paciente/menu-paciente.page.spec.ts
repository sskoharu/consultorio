import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuPacientePage } from './menu-paciente.page';

describe('MenuPacientePage', () => {
  let component: MenuPacientePage;
  let fixture: ComponentFixture<MenuPacientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
