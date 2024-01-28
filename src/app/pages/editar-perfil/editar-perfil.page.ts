import { Component, OnInit } from '@angular/core';
import { ApiCrudService } from 'src/app/servicios/api-crud.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

userdata: any;

usuario ={
  id:0,
  nombre:sessionStorage.getItem('nombre'),
  n_usuario:sessionStorage.getItem('n_usuario'),
  telefono:sessionStorage.getItem('telefono'),
  password: "",
  rol: "",
  isactive: true,
}

  constructor(private authservice: AuthService,
              private apiCrud: ApiCrudService,
              private router: Router) { }

  ionViewWillEntar(){
    this.getUserByName(this.getNameFromUrl());
  }

  ngOnInit() {
    this.authservice.GetUserById(this.usuario.n_usuario).subscribe(resp=>{
      this.userdata = resp;
      console.log(this.userdata);
      {
        this.usuario ={
          id : this.userdata[0].id,
          nombre: this.userdata[0].nombre,
          n_usuario: this.userdata[0].n_usuario,
          telefono: this.userdata[0].telefono,
          password: this.userdata[0].password,
          rol: this.userdata[0].rol,
          isactive: this.userdata[0].isactive
        }
      }
    }
    )
  }
  getNameFromUrl(){
    let url=this.router.url;
    let arr=url.split("/",3);
    let id=parseInt(arr[2])
    return id;
  }

  getUserByName(userID:number){
    this.apiCrud.BuscarHorarioID(userID).subscribe(
      (resp:any)=>{
        this.usuario={
          id: resp[0].id,
          nombre: resp[0].nombre,
          n_usuario: resp[0].n_usuario,
          telefono: resp[0].telefono,
          password: resp[0].password,
          rol: resp[0].rol,
          isactive: resp[0].isactive
        }
      }
    )
  }

  updateUsuario(){
    this.apiCrud.ActualizarUsuario(this.usuario).subscribe();
    this.router.navigateByUrl("/perfil")
  }
}