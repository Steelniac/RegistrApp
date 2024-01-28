import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, RefresherCustomEvent } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {

  userdata: any;

  usuario={
    id:0,
    nombre:sessionStorage.getItem('nombre'),
    n_usuario:sessionStorage.getItem('n_usuario'),
    telefono:sessionStorage.getItem('telefono'),
    rol: ""
  }

  constructor(private menuController: MenuController,
              private authservice: AuthService,
              private loadingCTRL: LoadingController) { }

              
    ionViewWillEnter() {
      this.loadPerfil();
  }
  
  async loadPerfil(event?: RefresherCustomEvent){

    const loading = await this.loadingCTRL.create({
      message: "Cargando...",
      spinner: "bubbles"
    });

    await loading.present();

    
    this.authservice.GetUserById(this.usuario.n_usuario).subscribe(resp=>{
      this.userdata = resp;
      console.log(this.userdata);
      {
        this.usuario ={
          id : this.userdata[0].id,
          nombre: this.userdata[0].nombre,
          n_usuario: this.userdata[0].n_usuario,
          telefono: this.userdata[0].telefono,
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
