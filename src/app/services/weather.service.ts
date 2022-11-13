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
    return this.http.get<weatherData>("https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid=8f36aa489bb280013ea4b3be2e70e2dc&units=metric")
  }
}
