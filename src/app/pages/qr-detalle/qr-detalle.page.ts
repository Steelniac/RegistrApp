import { Component, OnInit } from '@angular/core';
import { ApiCrudService } from 'src/app/servicios/api-crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-detalle',
  templateUrl: './qr-detalle.page.html',
  styleUrls: ['./qr-detalle.page.scss'],
})
export class QrDetallePage{

horario = {
  id:0,
  nombre: "",
  hora: "",
  sala:0,
}

ramoID = String(this.getIdFromUrl());

  constructor(private apiCrud: ApiCrudService, 
              private router: Router) { }

  ionViewWillEnter(){
    this.getHorarioById(this.getIdFromUrl());
  }

  getIdFromUrl(){
    let url=this.router.url;
    let arr=url.split("/",3);
    let id = parseInt(arr[2]);
    return id;
  }

  getHorarioById(HorarioID:number){
    this.apiCrud.BuscarHorarioID(HorarioID).subscribe(
      (resp:any)=>{                 //resp llega en formato de arreglo de un objeto 
        this.horario={
          id: resp[0].id,
          nombre: resp[0].nombre,
          hora: resp[0].hora,
          sala: resp[0].sala
        }
      }
    )
  }

}
