import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, MenuController } from '@ionic/angular';
import { ApiCrudService } from 'src/app/servicios/api-crud.service';
import { LoadingController } from '@ionic/angular';
import { IHorarios } from '../interfaces/interfaces';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-alert',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})

export class AlertPage{

  userdata: any;

  horarios:IHorarios[]=[];

  usuario={
    id:0,
    nombre: sessionStorage.getItem('nombre'),
    n_usuario:sessionStorage.getItem('n_usuario'),
    rol: sessionStorage.getItem('rol')
  }

  constructor(private menuController: MenuController,
              private authservice: AuthService,
              private loadingCTRL : LoadingController,
              private apiCrud : ApiCrudService) { }


  ionViewWillEnter(){
    this.loadPrincipal();
  } 

  async loadPrincipal(event?: InfiniteScrollCustomEvent){

    const loading = await this.loadingCTRL.create({
      message: "Cargando...",
      spinner: "bubbles"
    });
    await loading.present();

    this.apiCrud.listarHorarios().subscribe(
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

    this.authservice.GetUserById(this.usuario.n_usuario).subscribe(resp=>{
      this.userdata = resp;
      console.log(this.userdata);
      {
        this.usuario ={
          id : this.userdata[0].id,
          nombre: this.userdata[0].nombre,
          n_usuario: this.userdata[0].n_usuario,
          rol: this.userdata[0].rol
        }
        loading.dismiss();
      }
    })
  }

  DispMenu(){
    this.menuController.open('first')
  }
}