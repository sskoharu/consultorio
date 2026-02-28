import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon,IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonCardContent, IonItem, IonLabel, NavController, IonFab, IonFabButton, IonBadge, IonButtons, IonCol, IonRow, IonGrid } from '@ionic/angular/standalone';
import { AccesoService } from '../servicio.service';

@Component({
  selector: 'app-historial-cita',
  templateUrl: './historial-cita.page.html',
  styleUrls: ['./historial-cita.page.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonButtons, IonBadge, IonFabButton, IonFab, IonLabel, IonItem, IonCardContent, IonIcon, IonHeader, IonTitle, IonToolbar,IonCardSubtitle, IonButton,IonCardTitle,IonContent, IonCardHeader, IonCard,  CommonModule, FormsModule]
})
export class HistorialCitaPage implements OnInit {
 citas: any[] = []; 
  constructor(private servicio:AccesoService,
     private navCtrl:NavController) { }

  async ngOnInit() {
    const idString = await this.servicio.getSession('odontologoId');
  const odontologoId = parseInt(idString || '0', 10);

  const datos = {
    accion: 'obtener_citas_atendidas_odontologo',
    OdontologoId: odontologoId
  };

  this.servicio.postData(datos).subscribe((resp: any) => {
    if (resp.estado) {
      this.citas = resp.citas; 
    } else {
      this.citas = [];
    }
  });
}
regresar() {
    this.navCtrl.back();
  }
}
