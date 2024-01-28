import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

interface Componente{
  icon:string;
  name: string;
  redirecTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

constructor(private menuController: MenuController) {}
  opciones : Componente[]=[
  {
    icon: 'home-outline',
    name:'Inicio',
    redirecTo: '/principal'
  },
  {
    icon: 'person-outline',
    name:'Perfil',
    redirecTo: '/perfil'
  },
  {
    icon: 'help-outline',
    name:'¿Qué es ResgisAPP?',
    redirecTo: '/about'
  },
  {
    icon: 'cloudy-night-outline',
    name:'Clima',
    redirecTo: '/clima'
  },

]

logout(){
  sessionStorage.clear();
  this.menuController.close('first');
}
}
