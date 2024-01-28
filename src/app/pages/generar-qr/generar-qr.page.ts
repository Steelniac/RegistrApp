import { Component, OnInit } from '@angular/core';
import { ApiCrudService } from 'src/app/servicios/api-crud.service';
import { LoadingController } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { IHorarios } from '../interfaces/interfaces';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage{

horarios: IHorarios[]=[];

  constructor(private horarioservice: ApiCrudService,
              private loadingCtrl: LoadingController) { }

  ionViewWillEnter(){
    this.loadHorarios();
    }
    async loadHorarios(event?: InfiniteScrollCustomEvent){
    
      const loading = await this.loadingCtrl.create({
        message: "Cargando..",
        spinner: "bubbles"
      });
      await loading.present();
  
  
      this.horarioservice.listarHorarios().subscribe(
        {
          next: resp=>{
            console.log(resp);
           loading.dismiss();
            let listString = JSON.stringify(resp)
            this.horarios=JSON.parse(listString)
            event?.target.complete();
            console.log(this.horarios);
            
          },
          error: err =>{
            console.log(err.error.message);
           loading.dismiss();
          }
        }
      ) 
    }
}
