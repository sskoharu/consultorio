import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonButton, IonItem } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { AccesoService } from '../servicio.service';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.page.html',
  styleUrls: ['./recuperar-clave.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonLabel, IonToolbar, IonItem, CommonModule, FormsModule]
})
export class RecuperarClavePage implements OnInit {

  txt_nuevaClave: string = '';
  txt_confirmClave: string = '';
  token: string = ''; 

  constructor(private servicio: AccesoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
    });
  }

  async actualizarClave() {
    if (!this.txt_nuevaClave || !this.txt_confirmClave) {
      this.servicio.showToast('Ingrese todos los campos', 2000);
      return;
    }

    if (this.txt_nuevaClave !== this.txt_confirmClave) {
      this.servicio.showToast('Las contraseñas no coinciden', 2000);
      return;
    }

    if (!this.token) {
      this.servicio.showToast('Token inválido', 2000);
      return;
    }

    const datos = {
      accion: 'actualizar_clave',
      token: this.token,
      new_password: this.txt_nuevaClave
    };

    this.servicio.postData(datos).subscribe(async (resp: any) => {
      if (resp.estado) {
        await this.servicio.showToast('Contraseña actualizada correctamente', 2000);
      } else {
        await this.servicio.showToast(resp.mensaje || 'No se pudo actualizar la contraseña', 2000);
      }
    }, async (error) => {
      await this.servicio.showToast('Error en la solicitud: ' + error.message, 2000);
    });
  }

}
