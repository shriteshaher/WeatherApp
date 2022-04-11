import { Component } from '@angular/core';
import { CallApiService } from './call-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Weather';
  weather:any
  t1:boolean=true
  t2:boolean=false
  constructor(private callApi:CallApiService){
     this.callApi.getApi("Nashik").subscribe(res=>{
      this.weather=res
      console.log(res)
    })
  }
  open(t1:boolean,t2:boolean){
      this.t1=t1
      this.t2=t2
  }

  close(t1:boolean,t2:boolean){
    this.t1=false
    this.t2=true
  }

  search1(search:string){
    console.log(search)
    if(search!="")
    this.callApi.getApi(search).subscribe(res=>{
      this.weather=res
    })
    else
     this.callApi.getApi("Nashik").subscribe(res=>{
      this.weather=res

    })
  }

}
