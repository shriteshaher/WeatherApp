import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  constructor(private http: HttpClient) { }

  getApiC(city:string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=490a4797cec2fac54e420d085c76df02&units=Metric`)
  }

  getApiF(city:string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=490a4797cec2fac54e420d085c76df02&units=Imperial`)
  }
}
