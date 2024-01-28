import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  userdata: any;

  usuario = {
    id:0,
    nombre:'',
    n_usuario:'',
    telefono:"",
    password:'',
    rol:'',
    isactive: true
  }
  
  loginForm: FormGroup;

  constructor(private authservice: AuthService,
              private toastcontroller: ToastController,
              private alertcontroller: AlertController,
              private builder: FormBuilder,
              private router: Router){
              this.loginForm = this.builder.group({
                'n_usuario' : new FormControl("", [Validators.required, Validators.minLength(4)]),
                'password'  : new FormControl("", [Validators.required, Validators.minLength(8)]),
              })
            }

  ngOnInit() {
  }

  login(){
    if (this.loginForm.valid){
      this.authservice.GetUserById(this.loginForm.value.n_usuario).subscribe(resp=>{
        this.userdata = resp;
        console.log(this.userdata);
        if (this.userdata.length >0)
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
          if (this.usuario.password === this.loginForm.value.password)
          {
            if (this.usuario.isactive)
            {
            sessionStorage.setItem('nombre', this.usuario.nombre);
            sessionStorage.setItem('n_usuario', this.usuario.n_usuario);
            sessionStorage.setItem('telefono', this.usuario.telefono);
            sessionStorage.setItem('rol', this.usuario.rol);
            sessionStorage.setItem('ingresado', 'true');
            this.showToast('Sesión iniciada');
            this.router.navigateByUrl("/principal");
            }
            else{
              this.UserInactivo();
            }
          }
          else{
            this.Error();
          }
        }
        else{
          this.NoExiste();
          this.loginForm.reset();
        }

      })
    }
  }
  
  async showToast(msg: any){
    const toast = await this.toastcontroller.create({ 
      message: msg,
      duration: 3000
    })
    toast.present();
  }

  async UserInactivo(){
    const alerta = await this.alertcontroller.create({ 
      header: 'Error..',
      message: 'Usuario inactivo..',
      buttons: ['Ok']
     });
     alerta.present();
     return;
  }

  async Error(){
    const alerta = await this.alertcontroller.create({ 
      header: 'Error..',
      message: 'Revise sus credenciales..',
      buttons: ['Ok']
     });
     alerta.present();
     return;
  }

  async NoExiste(){
    const alerta = await this.alertcontroller.create({ 
      header: 'Error..',
      message: 'Usuari@ debe registrarse..',
      buttons: ['Ok']
     });
     alerta.present();
     return;
  }

}