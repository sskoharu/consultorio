import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  IonItem, IonIcon, IonInput, IonLabel,
   AlertController, 
   IonSelect,
   IonSelectOption, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent} from '@ionic/angular/standalone';
import { AccesoService } from '../servicio.service';
import { ToastController } from '@ionic/angular';
import { IonDatetime } from '@ionic/angular/standalone';
import {  IonButton } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-registro-cita',
  templateUrl: './registro-cita.page.html',
  styleUrls: ['./registro-cita.page.scss'],
  imports: [FormsModule,IonButton, IonDatetime,IonInput,IonLabel,IonCardContent,IonSelect,IonSelectOption,NgIf,IonButton,IonIcon, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, IonCard],
  standalone: true,
})
export class RegistroCitaPage {
  mensajeHorasDisponibles: string = '';
  motivo: string = ""
  fechaHora: string = '';
  fechaHoraFormateada: string = '';
  fechaMinima: string = '';
  odontologo: any = null;


  constructor(
    private servicio: AccesoService,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}
  ngOnInit() {
  const hoy = new Date();
  hoy.setDate(hoy.getDate() + 1);
  this.fechaMinima = hoy.toISOString().split('T')[0]; 
  
}
validarFecha(event: any) {
  const valor = event.detail.value;
  const fecha = new Date(valor);
  const dia = fecha.getDay();

  this.actualizarInputFecha(event);

  const datos = {
    accion: 'cita_fecha',
    fecha: this.fechaHoraFormateada.substring(0, 10)  // solo fecha sin hora
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
async guardarCita() {
  const pacienteId = await this.servicio.getSession('pacienteId');
  const email = await this.servicio.getEmail();
  if (!this.fechaHoraFormateada) {
    const toast = await this.toastCtrl.create({
      message: 'Por favor seleccione una fecha y hora',
      duration: 2000,
      color: 'warning'
    });
    toast.present();
    return;
  }

  // Extraer solo la fecha y hora seleccionada
  const fechaSeleccionada = this.fechaHoraFormateada.substring(0, 10);
  const horaSeleccionada = this.fechaHoraFormateada.substring(11, 13); // 'HH' del formato 'YYYY-MM-DD HH:mm:ss'

  // Primero consultamos los horarios ocupados de ese día
  const datosConsulta = {
    accion: 'cita_fecha',
    fecha: fechaSeleccionada
  };

  this.servicio.postData(datosConsulta).subscribe(async (resp: any) => {
    if (resp.estado) {
      // Extraer solo la hora sin minutos de cada hora ocupada
      const horasOcupadasSoloHora = resp.horasOcupadas.map((h: string) => h.substring(0, 2));

      // Verificamos si la hora seleccionada está ocupada
      if (horasOcupadasSoloHora.includes(horaSeleccionada)) {
        const toast = await this.toastCtrl.create({
          message: `La hora ${horaSeleccionada}:00 ya está ocupada, elija otra.`,
          duration: 3000,
          color: 'danger'
        });
        toast.present();
        return; // Cancelar registro
      } else {
        // No está ocupada, registrar cita normalmente
        let datos = {
          accion: 'registrar_cita',
          PacienteId: pacienteId,
          Fecha: this.fechaHoraFormateada,
          Motivo: this.motivo,
          Odontologo: this.odontologo,
          email:email
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
                    this.navCtrl.navigateRoot('/menu-paciente');
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
regresar() {
  this.navCtrl.back();
}
  
}

