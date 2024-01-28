import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHorarios, Users } from '../pages/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { IHorario } from '../pages/interfaces/interfaces';
import { User } from '../pages/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiCrudService {

  constructor(private httpclient:HttpClient) { }

  listarHorarios():Observable<IHorarios>{
    return this.httpclient.get<IHorarios>(`${environment.apiURL}/horarios`);
  }

  CrearUsuario(newUser: User): Observable<User>{
    return this.httpclient.post<User>(`${environment.apiURL}/usuarios`, newUser);
  }

  BuscarUsuarioID(n_usuario:String):Observable<User>{
    return this.httpclient.get<User>(`${environment.apiURL}/usuarios/?n_usuario=${n_usuario}`);
  }

  ActualizarUsuario(Usuario:any):Observable<Users>{
    return this.httpclient.put<Users>(`${environment.apiURL}/usuarios/${Usuario.id}`, Usuario);
  }

  BuscarHorarioID(id:number):Observable<IHorarios>{
    return this.httpclient.get<IHorarios>(`${environment.apiURL}/horarios/?id=${id}`);
  }
}
