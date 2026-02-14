import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonItem, IonIcon, IonInput,
   IonLoading, IonLabel,
   AlertController,
   IonSelectOption} from '@ionic/angular/standalone';
import { AccesoService } from '../servicio.service';
import { ModalController, ToastController } from '@ionic/angular/standalone';
import { MenuPacientePage } from '../menu-paciente/menu-paciente.page';
import { MenuOdontologoPage } from '../menu-odontologo/menu-odontologo.page';
import { IonDatetime } from '@ionic/angular/standalone';
import { IonAlert, IonButton } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-actualizar-cita',
  templateUrl: './actualizar-cita.page.html',
  styleUrls: ['./actualizar-cita.page.scss'],
  imports: [FormsModule,IonButton, IonDatetime,IonInput,IonLabel,NgIf,IonButton,IonIcon, IonItem],
  standalone: true,
})
export class ActualizarCitaPage {
  mensajeHorasDisponibles: string = '';
  motivo: string = ""
  fechaHora: string = '';
  fechaHoraFormateada: string = '';
  fechaMinima: string = '';
  alertButtons=["Volver"];
  constructor(
    private servicio: AccesoService,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}
  @Input() cita: any;
  ngOnInit() {
  console.log('Cita recibida:', this.cita);
  if (this.cita) {
    this.motivo = this.cita.Motivo || '';
    this.fechaHoraFormateada = this.cita.Fecha || '';
    this.fechaHora = this.cita.Fecha || '';
    console.log('CitaId:', this.cita.Id);
    const hoy = new Date();
  hoy.setDate(hoy.getDate() + 1);
  this.fechaMinima = hoy.toISOString().split('T')[0]; 
  }
}
  validarFecha(event: any) {
  const valor = event.detail.value;
  const fecha = new Date(valor);
  const dia = fecha.getDay();

  this.actualizarInputFecha(event);

  const datos = {
    accion: 'cita_fecha',
    fecha: this.fechaHoraFormateada.substring(0, 10)  
  };

  this.servicio.postData(datos).subscribe((resp: any) => {
    if (resp.estado) {
      const horasOcupadasSoloHora = resp.horasOcupadas.map((h: string) => h.substring(0, 2));

      const todasLasHoras = ['10', '11', '12', '13', '14', '15', '16', '17', '18'];
      const disponibles = todasLasHoras.filter(hora => !horasOcupadasSoloHora.includes(hora));

      const fechaReducida = this.fechaHoraFormateada.substring(0, 10);

      this.mensajeHorasDisponibles = disponibles.length > 0
        ? `Horarios disponibles para el ${fechaReducida}: ${disponibles.join(', ')}`
        : `No hay horarios disponibles para el ${fechaReducida}`;
    } else {
      this.mensajeHorasDisponibles = 'No se pudo obtener la información de horarios.';
    }
  });
}
actualizarInputFecha(event: any) {
  const valor = event.detail.value;
  if (valor && valor.includes('T')) {
    const [fecha, hora] = valor.split('T');
    this.fechaHoraFormateada = `${fecha} ${hora}`;
  } else {
    this.fechaHoraFormateada = valor || '';
  }
}
async actualizarCita(){
  const pacienteId = await this.servicio.getSession('pacienteId');
  if (!this.fechaHoraFormateada) {
    const toast = await this.toastCtrl.create({
      message: 'Por favor seleccione una fecha y hora',
      duration: 2000,
      color: 'warning'
    });
    toast.present();
    return;
  }
  const fechaSeleccionada = this.fechaHoraFormateada.substring(0, 10);
  const horaSeleccionada = this.fechaHoraFormateada.substring(11, 13); 
  const datosConsulta = {
    accion: 'cita_fecha',
    fecha: fechaSeleccionada
  };

  this.servicio.postData(datosConsulta).subscribe(async (resp: any) => {
    if (resp.estado) {
      const horasOcupadasSoloHora = resp.horasOcupadas.map((h: string) => h.substring(0, 2));
      if (horasOcupadasSoloHora.includes(horaSeleccionada)) {
        const toast = await this.toastCtrl.create({
          message: `La hora ${horaSeleccionada}:00 ya está ocupada, elija otra.`,
          duration: 3000,
          color: 'danger'
        });
        toast.present();
        return; 
      } else {
        
        let datos = {
          accion: 'actualizar_cita',
          CitaId: this.cita.Id,
          Fecha: this.fechaHoraFormateada,
          Motivo: this.motivo
        };
        this.servicio.postData(datos).subscribe(async (resp: any) => {
          if (resp.estado) {
            const alert = await this.alertCtrl.create({
              header: 'Éxito',
              message: 'Su cita fue agendada correctamente.',
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    this.modalCtrl.dismiss();
                  }
                }
              ]
            });
            await alert.present();
          } else {
            const toast = await this.toastCtrl.create({
              message: resp.mensaje,
              duration: 2000,
              color: 'danger'
            });
            toast.present();
          }
        }, async (error) => {
           console.error('ERROR en actualizar_cita:', error);
          const toast = await this.toastCtrl.create({
            message: 'Error de conexión o datos',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        });
      }
    } else {
      const toast = await this.toastCtrl.create({
        message: 'No se pudo verificar la disponibilidad de horarios.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  });
}
Cerrar(){this.modalCtrl.dismiss();}
}



