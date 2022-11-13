import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { weatherData } from '../models/weather.models';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherData(cityname:string):Observable<weatherData>{
    return this.http.get<weatherData>("https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+environment.appid+"&units=metric")
  }
}
