import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuOdontologoPage } from './menu-odontologo.page';

describe('MenuOdontologoPage', () => {
  let component: MenuOdontologoPage;
  let fixture: ComponentFixture<MenuOdontologoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOdontologoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
