import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { publishFacade } from '@angular/compiler';

import{Preferences} from '@capacitor/preferences';
import { HttpHeaders,HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
server: string="http://localhost/Ws_Consultorio/ws_consultorio.php"

  constructor(
        public toastCtrl:ToastController,
        public http:HttpClient

  ) { }
postFormData(formData: FormData) {
  return this.http.post(this.server, formData);
}

  postData(body:any){
    let head=new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
    let options={
      headers:head
    }
    return this.http.post(this.server,JSON.stringify(body), options)
  }

  async showToast(mensaje:string, tiempo:number){
    const toast= await this.toastCtrl.create({
      message:mensaje,
      duration:tiempo,
      position:'top'
    })
    toast.present()
  }

  async createSession(id:string, valor:string){
    await Preferences.set({
      key:id,
      value:valor
    })
  }

  async getSession(id:string){
    const item=await Preferences.get({
      key:id
    })
    return item.value
  }
  async getEmail(): Promise<string | null> {
  const item = await Preferences.get({ key: 'email' });
  return item.value;
}

  async closeSession(){
    await Preferences.clear()
  }

}
