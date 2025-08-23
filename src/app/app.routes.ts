import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'menu-paciente',
    loadComponent: () => import('./menu-paciente/menu-paciente.page').then( m => m.MenuPacientePage)
  },
  {
    path: 'menu-odontologo',
    loadComponent: () => import('./menu-odontologo/menu-odontologo.page').then( m => m.MenuOdontologoPage)
  },
  {
    path: 'registro-cita',
    loadComponent: () => import('./registro-cita/registro-cita.page').then( m => m.RegistroCitaPage)
  },
  {
    path: 'actualizar-cita',
    loadComponent: () => import('./actualizar-cita/actualizar-cita.page').then( m => m.ActualizarCitaPage)
  },
  {
    path: 'registro-paciente',
    loadComponent: () => import('./registro-paciente/registro-paciente.page').then( m => m.RegistroPacientePage)
  },
  {
    path: 'actualizar-paciente',
    loadComponent: () => import('./actualizar-paciente/actualizar-paciente.page').then( m => m.ActualizarPacientePage)
  },
  {
    path: 'historial-cita',
    loadComponent: () => import('./historial-cita/historial-cita.page').then( m => m.HistorialCitaPage)
  },
  {
    path: 'historial-cita-paciente',
    loadComponent: () => import('./historial-cita-paciente/historial-cita-paciente.page').then( m => m.HistorialCitaPacientePage)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }