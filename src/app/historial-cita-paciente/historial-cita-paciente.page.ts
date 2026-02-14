import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, 
  IonCardSubtitle, IonCard, IonText, IonItem, IonLabel, IonButton, NavController, AlertController, IonCardContent,
  ToastController,IonIcon} from '@ionic/angular/standalone';
import { AccesoService } from '../servicio.service';

@Component({
  selector: 'app-historial-cita-paciente',
  templateUrl: './historial-cita-paciente.page.html',
  styleUrls: ['./historial-cita-paciente.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel,IonTitle, IonItem,IonIcon,IonCardContent, IonCard,IonToolbar,IonHeader, IonCardSubtitle, IonCardTitle,IonContent, IonCardHeader, CommonModule, FormsModule]
})
export class HistorialCitaPacientePage implements OnInit {
  citasPaciente: any[] = [];
  odontologosDatosMap: { [key: number]: any } = {};
  constructor(private servicio: AccesoService,
    private navCtrl: NavController, private alertCtrl: AlertController, private toastCtrl: ToastController
  ) {}
  async ngOnInit() {
    const id = await this.servicio.getSession('pacienteId');
    console.log('ID de paciente recuperado de sesión:', id);
    const datos = {
      accion: 'obtener_citas_atendidas_paciente',
      PacienteId: id
    };
    this.servicio.postData(datos).subscribe(async (resp: any) => {
      if (resp.estado) {
        this.citasPaciente = resp.citas || [];
        for (const cita of this.citasPaciente) {
          if (!this.odontologosDatosMap[cita.OdontologoId]) {
            await this.cargarDatosOdontologo(cita.OdontologoId);
          }
        }
      } else {
        this.citasPaciente = [];
        this.odontologosDatosMap = {};
      }
    });
  }
  async cargarDatosOdontologo(odontologoId: number) {
    const datosOdonto = {
      accion: 'obtener_datos_odontologo',
      Id: odontologoId
    };
    return new Promise<void>((resolve) => {
      this.servicio.postData(datosOdonto).subscribe((resp: any) => {
        if (resp.estado) {
          this.odontologosDatosMap[odontologoId] = resp.datos;
        } else {
          this.odontologosDatosMap[odontologoId] = null;
        }
        resolve();
      });
    });
  }
  async abrirCalificacion(citaId: number) {
  const alert = await this.alertCtrl.create({
    header: 'Califica tu cita',
    message: 'Selecciona una calificación de 1 a 5 estrellas',
    inputs: [
      { name: 'calificacion', type: 'radio', label: '⭐', value: '1' },
      { name: 'calificacion', type: 'radio', label: '⭐⭐', value: '2' },
      { name: 'calificacion', type: 'radio', label: '⭐⭐⭐', value: '3' },
      { name: 'calificacion', type: 'radio', label: '⭐⭐⭐⭐', value: '4' },
      { name: 'calificacion', type: 'radio', label: '⭐⭐⭐⭐⭐', value: '5' },
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Guardar',
        handler: (data) => {
          if (data) {
            this.abrirOpinionAlert(citaId, parseInt(data));;
          }
        }
      }
    ]
  });

  await alert.present();
}
async abrirOpinionAlert(citaId: number, calificacion: number) {
  const alertOpinion = await this.alertCtrl.create({
    header: 'Escribe tu opinión',
    inputs: [
      {
        name: 'opinion',
        type: 'textarea',
        placeholder: 'Escribe aquí tu opinión (opcional)',
      }
    ],
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      { 
        text: 'Guardar', 
        handler: (data) => {
          const opinion = data.opinion ? data.opinion.trim() : '';
          
          this.guardarCalificacion(citaId, calificacion, opinion);
        }
      }
    ]
  });

  await alertOpinion.present();
}
guardarCalificacion(citaId: number, calificacion: number, opinion: string) {
  const datos = {
    accion: 'calificar_cita',
    CitaId: citaId,
    Calificacion: calificacion,
    Opinion: opinion
  };

  this.servicio.postData(datos).subscribe((resp: any) => {
    if (resp.estado) {
      
      const cita = this.citasPaciente.find(c => c.Id === citaId);
      if (cita) cita.Calificacion = calificacion;

      
      this.servicio.showToast('Calificación guardada con éxito',3000);
    } else {
      this.servicio.showToast('Error al guardar la calificación',3000);
    }
  });
}

  regresar() {
    this.navCtrl.back();
  }


}

