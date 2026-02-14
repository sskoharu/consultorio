import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, NavController,
IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonRow, IonCol, 
ModalController, IonAlert, IonGrid, IonIcon} from '@ionic/angular/standalone';
import { AccesoService } from '../servicio.service';
import { AlertController, ToastController } from '@ionic/angular';
import { ActualizarCitaPage } from '../actualizar-cita/actualizar-cita.page';
import { ActualizarPacientePage } from '../actualizar-paciente/actualizar-paciente.page';
import { IonicModule } from '@ionic/angular';
import { Icon } from 'ionicons/dist/types/components/icon/icon';


@Component({
  selector: 'app-menu-paciente',
  templateUrl: './menu-paciente.page.html',
  styleUrls: ['./menu-paciente.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonRow,
    IonCol,
    IonIcon,
    IonGrid
  ]
})

export class MenuPacientePage implements OnInit {
  odontologoDatos: any = null;

  citaPaciente: any = null;
  constructor(private navCtrl:NavController,
    private servicio:AccesoService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) { }
async ngOnInit() {
  const id = await this.servicio.getSession('pacienteId');
  console.log('ID de paciente recuperado de sesión:', id);

  const datos = {
    accion: 'obtener_cita_paciente',
    PacienteId: id
  };

  this.servicio.postData(datos).subscribe((resp: any) => {
    if (resp.estado) {
      this.citaPaciente = resp.cita;

      this.cargarDatosOdontologo(this.citaPaciente.OdontologoId);
    } else {
      this.citaPaciente = null;
      this.odontologoDatos = null;
    }
  });
}
cargarDatosOdontologo(odontologoId: number) {
  const datosOdonto = {
    accion: 'obtener_datos_odontologo',
    Id: odontologoId
  };

  this.servicio.postData(datosOdonto).subscribe((resp: any) => {
    if (resp.estado) {
      this.odontologoDatos = resp.datos;
    } else {
      this.odontologoDatos = null;
    }
  });
}
RegistrarCita() {
this.navCtrl.navigateForward('/registro-cita');
}
CerrarSesion() {
  
this.servicio.closeSession()
   this.navCtrl.navigateRoot("/home"); }
async modificarCita(cita: any) {
  const modal = await this.modalCtrl.create({
    component: ActualizarCitaPage,
    componentProps: {
      cita: this.citaPaciente
    },
    cssClass: 'modal-grande'
  });
  await modal.present();

  const { data } = await modal.onDidDismiss();
  if (data?.actualizado) {
    this.ngOnInit();
  }
}
async cancelarCita(cita: any) {
  const alert = await this.alertCtrl.create({
    header: 'Confirmar cancelación',
    message: '¿Estás seguro de que deseas cancelar tu cita?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary'
      },
      {
        text: 'Sí, cancelar',
        handler: () => {
          const datos = {
            accion: 'cancelar_cita',
            Id: cita.Id
          };

          this.servicio.postData(datos).subscribe((resp: any) => {
  if (resp.estado) {
    this.citaPaciente = null;
    
    this.mostrarToast('Cita cancelada con éxito');
  } else {
    this.mostrarToast('Error al cancelar la cita');
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
async actualizarPerfil() {
  const id = await this.servicio.getSession('pacienteId');
  const modal = await this.modalCtrl.create({
    component: ActualizarPacientePage,
    componentProps: {
      cita: this.citaPaciente
    },
    cssClass: 'modal-grande'
  })
  await modal.present();
  console.log('ID de paciente recuperado de sesión para actualizar perfil:', id);
};
async verHistorial() {
  this.navCtrl.navigateForward('/historial-cita-paciente');
}


}


