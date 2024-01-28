import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  constructor(private Http: HttpClient) { }

  getWeather(){
    return this.Http.get('https://api.openweathermap.org/data/2.5/weather?lat=-33.4569&lon=-70.6483&appid=cd1b8503d61249a974df126978698a56')
  }
}
