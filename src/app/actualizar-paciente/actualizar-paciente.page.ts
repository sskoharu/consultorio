import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel,IonButton,  ModalController, IonItem, IonCard,IonIcon } from '@ionic/angular/standalone';
import { AccesoService } from '../servicio.service';

@Component({
  selector: 'app-actualizar-paciente',
  templateUrl: './actualizar-paciente.page.html',
  styleUrls: ['./actualizar-paciente.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonLabel, IonCard,IonIcon , IonToolbar, IonItem, CommonModule, FormsModule]
})
export class ActualizarPacientePage implements OnInit {
txt_cedula: string = ""
  txt_nombre: string = ""
 txt_apellido: string = ""
 txt_edad: string = ""
  txt_telefono: string = ""
  txt_correo: string = ""
  txt_contrasena: string = ""
  constructor(private modalCtrl:ModalController, private servicio:AccesoService) { }

  async ngOnInit() {
  const id = await this.servicio.getSession('pacienteId');
  
  const body = {
    accion: 'obtener_datos_paciente',
    Id: id
  };

  this.servicio.postData(body).subscribe((resp: any) => {
    if (resp.estado) {
      const datos = resp.datos;

      
      this.txt_cedula = datos.Cedula;
      this.txt_nombre = datos.Nombre;
      this.txt_apellido = datos.Apellido;
      this.txt_edad = datos.Edad;
      this.txt_telefono = datos.Telefono;
      this.txt_correo = datos.Email;

    } else {
      this.servicio.showToast('No se pudieron cargar los datos del perfil', 2000);
    }
  });
}

async actualizarPaciente() {
  const id = await this.servicio.getSession('pacienteId');

  const datos = {
    accion: 'modificar_paciente',
    Id: id,
    nombre: this.txt_nombre,
    apellido: this.txt_apellido,
    edad: this.txt_edad,
    telefono: this.txt_telefono,
    email: this.txt_correo,
    contrasena: this.txt_contrasena
  };

  this.servicio.postData(datos).subscribe(async (resp: any) => {
    if (resp.estado) {
      console.log('Datos enviados al backend:', datos);

      await this.servicio.showToast('Perfil actualizado correctamente.', 2000);
      this.cerrarModal();
    } else {
      await this.servicio.showToast(resp.mensaje || 'No se pudo actualizar el perfil.', 2000);
    }
  }, async (error) => {
    await this.servicio.showToast('Error en la solicitud: ' + error.message, 2000);
  });
}
cerrarModal() {
  this.modalCtrl.dismiss();
}
}
