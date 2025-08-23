import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonAvatar,IonIcon,IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonButton, AlertController, ToastController, NavController } from '@ionic/angular/standalone';
import { AccesoService } from '../servicio.service';



@Component({
  selector: 'app-menu-odontologo',
  templateUrl: './menu-odontologo.page.html',
  styleUrls: ['./menu-odontologo.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonItem,IonTitle,IonAvatar, IonIcon, IonToolbar, IonCardContent, IonContent, IonHeader,IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, CommonModule, FormsModule]
})
export class MenuOdontologoPage implements OnInit {
  citas: any[] = []; // Inicializar como un array vacío
  constructor(private servicio:AccesoService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) { }
  async ngOnInit() {
  const idString = await this.servicio.getSession('odontologoId');
  const odontologoId = parseInt(idString || '0', 10);
  const datos = {
    accion: 'obtener_citas_odontologo',
    OdontologoId: odontologoId
  };
  this.servicio.postData(datos).subscribe((resp: any) => {
    if (resp.estado) {
      this.citas = resp.citas; // debe ser un array
    } else {
      this.citas = [];
    }
  });
}
async finalizarCita(cita: any) {
  const alert = await this.alertCtrl.create({
    header: 'Finalizar cita',
    message: `¿Deseas marcar la cita #${cita.Id} como atendida?`,
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary'
      },
      {
        text: 'Sí, finalizar',
        handler: () => {
          const datos = {
            accion: 'finalizar_cita',
            Id: cita.Id
          };

          this.servicio.postData(datos).subscribe((resp: any) => {
            if (resp.estado) {
              // Elimina la cita del array
              this.citas = this.citas.filter(c => c.Id !== cita.Id);
              this.mostrarToast('Cita finalizada con éxito');
            } else {
              this.mostrarToast('Error al finalizar la cita');
            }
          });
        }
      }
    ]
  });
  await alert.present();
}
async mostrarToast(mensaje: string) {
  const toast = await this.toastCtrl.create({
    message: mensaje,
    duration: 2000,
    position: 'bottom',
    color: 'success'
  });
  toast.present();
}
async verHistorial() {
  this.navCtrl.navigateForward(['/historial-cita', {}]);
}
CerrarSesion() {
this.servicio.closeSession()
   this.navCtrl.navigateRoot("/home"); }
}