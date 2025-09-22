import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonItem, IonIcon, IonInput, IonButton, IonLoading, NavController, IonModal, ModalController, AlertController, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { AccesoService } from '../servicio.service';
import { MenuPacientePage } from '../menu-paciente/menu-paciente.page';
import { MenuOdontologoPage } from '../menu-odontologo/menu-odontologo.page';
import { RegistroPacientePage } from '../registro-paciente/registro-paciente.page';
import { Icon } from 'ionicons/dist/types/components/icon/icon';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ FormsModule,IonButton, IonInput, IonIcon, IonItem, IonCardContent, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, IonCol],
  standalone: true,
})
export class HomePage {
  txt_usu: string=""
  txt_cla: string=""
  constructor(public servicio: AccesoService,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
    ) {}
  login() {
    let datos = {
      accion: 'login',
      email: this.txt_usu,
      contrasena: this.txt_cla
    }
     this.servicio.postData(datos).subscribe(async (res: any) => {
    console.log("Respuesta del servidor:", res); //  Aquí ves todo

    if (res.estado) {
      const usuario = res.persona[0];
      console.log("Datos del usuario:", usuario);
      await this.servicio.createSession("usuarioId", usuario.id);
      await this.servicio.createSession("email", usuario.email);
      await this.servicio.createSession("rol", usuario.rol);
      if (usuario.rol === "Paciente") {
        // Ya no necesitas usuario.idpaciente, porque usuario.id es el paciente
        await this.servicio.createSession("pacienteId", usuario.id);
        this.navCtrl.navigateRoot(['/menu-paciente']);
      } else if (usuario.rol === "Odontologo") {
        await this.servicio.createSession("odontologoId", usuario.id);
        this.navCtrl.navigateRoot(['/menu-odontologo']);
      }
    } else {
      this.servicio.showToast(res.mensaje || 'Error al iniciar sesión', 3000);
    }
  }, async () => {
    this.servicio.showToast('Error de comunicación con el servidor', 3000);
  });
}
async registro() {
  const modal = await this.modalCtrl.create({
    component: RegistroPacientePage,
  });

  await modal.present(); // <- ESTO es necesario para mostrarlo
}
async recuperar() {
  if (!this.txt_usu || this.txt_usu.trim() === '') {
    this.servicio.showToast('Ingrese su correo si olvidó su clave', 3000);
    return;
  }

  const alert = await this.alertCtrl.create({
    header: 'Recuperar clave',
    message: 'Se le enviará un correo con su clave',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary'
      },
      {
        text: 'OK',
        handler: () => {
          const datos = {
            accion: 'recuperar_clave',
            email: this.txt_usu
          };

          this.servicio.postData(datos).subscribe((resp: any) => {
            // Aquí puedes manejar la respuesta, por ejemplo:
            if (resp.estado) {
              this.servicio.showToast('Correo enviado con éxito', 3000);
            } else {
              this.servicio.showToast(resp.mensaje || 'No se pudo enviar el correo', 3000);
            }
          });
        }
      }
    ]
  });

  await alert.present();
}



}
