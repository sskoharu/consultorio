import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonLabel, IonButton, IonHeader, IonToolbar, IonTitle, IonIcon } from '@ionic/angular/standalone';
import { AccesoService } from '../servicio.service';
import { ModalController } from '@ionic/angular/standalone';
@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.page.html',
  styleUrls: ['./registro-paciente.page.scss'],
  standalone: true,
  imports: [ IonTitle, IonToolbar, IonHeader, IonButton,  IonContent, CommonModule, FormsModule]
})
export class RegistroPacientePage implements OnInit {
  
 txt_cedula: string = ""
  txt_nombre: string = ""
 txt_apellido: string = ""
 txt_edad: string = ""
  txt_telefono: string = ""
  txt_correo: string = ""
  txt_contrasena: string = ""
  
  constructor(private servicio:AccesoService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }
registrarPaciente() {
  // Validaciones
  if (!this.txt_cedula || this.txt_cedula.length !== 10 || !/^\d{10}$/.test(this.txt_cedula)) {
    this.servicio.showToast('La cédula debe tener exactamente 10 números', 3000);
    return;
  }

  if (!this.txt_nombre || this.txt_nombre.trim() === '') {
    this.servicio.showToast('El nombre no puede estar vacío', 3000);
    return;
  }

  if (!this.txt_apellido || this.txt_apellido.trim() === '') {
    this.servicio.showToast('El apellido no puede estar vacío', 3000);
    return;
  }

  const edad = Number(this.txt_edad);
  if (!edad || edad < 1 || edad > 100) {
    this.servicio.showToast('La edad debe ser un número entre 1 y 100', 3000);
    return;
  }

  if (!this.txt_telefono || !/^\d{10}$/.test(this.txt_telefono)) {
    this.servicio.showToast('El teléfono debe tener exactamente 10 números', 3000);
    return;
  }

  if (!this.txt_correo || !this.txt_correo.includes('@') || !this.txt_correo.includes('.')) {
    this.servicio.showToast('El correo debe contener "@" y "."', 3000);
    return;
  }

  if (!this.txt_contrasena || this.txt_contrasena.length < 6) {
    this.servicio.showToast('La contraseña debe tener al menos 6 caracteres', 3000);
    return;
  }

  // Si todas las validaciones pasan
  const datos = {
    accion: 'registrar_paciente',
    cedula: this.txt_cedula,
    nombre: this.txt_nombre.trim(),
    apellido: this.txt_apellido.trim(),
    edad: edad,
    telefono: this.txt_telefono,
    email: this.txt_correo.trim(),
    contrasena: this.txt_contrasena
  };

  this.servicio.postData(datos).subscribe(
    (res: any) => {
      if (res.estado) {
        this.servicio.showToast('Paciente registrado exitosamente', 3000);
        this.cerrarModal();
      } else {
        this.servicio.showToast(res.mensaje || 'Error al registrar paciente', 3000);
      }
    },
    (error) => {
      this.servicio.showToast('Error de comunicación con el servidor', 3000);
    }
  );
}

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}
