import { NodeWithI18n } from '@angular/compiler';
import { Component } from '@angular/core';
import { findIndex, map } from 'rxjs';
import { CallApiService } from './call-api.service';
import { NgxSpinnerService } from "ngx-spinner"; 
type wearther= {
  [key: string ]: string | string[]
} 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Weather';
  all_dates_C:any
  all_dates_F:any

  temprture_Day_WiseEntry_C=new Map()
  temprture_Day_WiseEntry_F=new Map()

  array_C:string[]=[]
  array_DateC:string[]=[]
  array_F:string[]=[]
  array_img:string[]=[]
  

  weartherImages:wearther={
    "01n":"../assets/Images/Clear.png",
    "02n":"../assets/Images/LightCloud.png",
    "03n":"../assets/Images/HeavyCloud.png",
    "04n":"../assets/Images/04d.png",
    "09n":"../assets/Images/LightRain.png",
    "10n":"../assets/Images/HeavyRain.png",
    "11n":"../assets/Images/Thunderstorm.png",
    "13n":"../assets/Images/snow.png",
    "50n":"../assets/Images/Sleet.png",
    "01d":"../assets/Images/Clear.png",
    "02d":"../assets/Images/LightCloud.png",
    "03d":"../assets/Images/HeavyCloud.png",
    "04d":"../assets/Images/04d.png",
    "09d":"../assets/Images/LightRain.png",
    "10d":"../assets/Images/HeavyRain.png",
    "11d":"../assets/Images/Thunderstorm.png",
    "13d":"../assets/Images/snow.png",
    "50d":"../assets/Images/Sleet.png"

  }
  weatherC:any
  weatherF:any
  t1:boolean=true
  t2:boolean=false
  today=new Date().toString()
  today1=this.today.substring(0,this.today.lastIndexOf("2022")+4)

  constructor(private callApi:CallApiService, private SpinnerService: NgxSpinnerService){
     this.callApi.getApiC("Nashik").subscribe(res=>{
      this.weatherC=res
      console.log("This api",this.SpinnerService.show())
     
      this.all_dates_C=this.weatherC['list']
     console.log("This",this.all_dates_C)
    
     for(let i in this.all_dates_C){
     
      let dt1=new Date(this.all_dates_C[i]['dt']*1000).toString()
      let dt2=dt1.substring(0,dt1.lastIndexOf("2022")+4)
       if(!this.temprture_Day_WiseEntry_C.has(dt2)){
        this.temprture_Day_WiseEntry_C.set(dt2,this.all_dates_C[i]["main"]["temp"])
        this.array_C.push(this.all_dates_C[i]["main"]["temp"])
        console.log(this.array_C)
        this.array_DateC.push(dt2)
        this.array_img.push(this.all_dates_C[i]['weather'][0]['icon'])
        
      }
      
    }
    })
    console.log(this.array_img)
    

    this.callApi.getApiF("Nashik").subscribe(res=>{
      this.weatherF=res
      //console.log(this.weatherF)
      this.all_dates_F=this.weatherF['list']
       
     for(let i in this.all_dates_F){
      let dt1=new Date(this.all_dates_F[i]['dt']*1000).toString()
      let dt2=dt1.substring(0,dt1.lastIndexOf("2022")+4)
       if(!this.temprture_Day_WiseEntry_F.has(dt2)){
        this.temprture_Day_WiseEntry_F.set(dt2,this.all_dates_F[i]["main"]["temp"])
        this.array_F.push(this.all_dates_F[i]["main"]["temp"])
        
      }
    }}
    )
    
    console.log("this",this.array_C,this.array_DateC)
    
    

    
         
    
    
     
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
    if(search!=""){
    this.callApi.getApiC(search).subscribe(res=>{
      this.weatherC=res
      this.temprture_Day_WiseEntry_C=new Map()
      this.all_dates_C=this.weatherC["list"]
      this.array_C=[]
      this.array_DateC=[]
      this.array_img=[]
      for(let i in this.all_dates_C){
        let dt1=new Date(this.all_dates_F[i]['dt']*1000).toString()
        let dt2=dt1.substring(0,dt1.lastIndexOf("2022")+4)
         if(!this.temprture_Day_WiseEntry_C.has(dt2)){
          this.temprture_Day_WiseEntry_C.set(dt2,this.all_dates_C[i]["main"]["temp"])
          this.array_DateC.push(dt2)
          this.array_C.push(this.all_dates_C[i]["main"]["temp"])
          this.array_img.push(this.all_dates_C[i]['weather'][0]['icon'])
        }
        
      }
      console.log(this.array_img)
    })


    this.callApi.getApiF(search).subscribe(res=>{
      this.weatherF=res
      this.temprture_Day_WiseEntry_F=new Map()

      for(let i in this.all_dates_F){
        let dt1=new Date(this.all_dates_F[i]['dt']*1000).toString()
        let dt2=dt1.substring(0,dt1.lastIndexOf("2022")+4)
         if(!this.temprture_Day_WiseEntry_F.has(dt2)){
          this.temprture_Day_WiseEntry_F.set(dt2,this.all_dates_F[i]["main"]["temp"])
          this.array_F.push(this.all_dates_F[i]["main"]["temp"])
        }
      }
      }
    )

  }
    else{
     this.callApi.getApiC("Nashik").subscribe(res=>{
      this.weatherC=res
      this.all_dates_C=this.weatherC["list"]
      this.temprture_Day_WiseEntry_C=new Map()
      this.array_C=[]
      this.array_DateC=[]
      for(let i in this.all_dates_C){
        let dt1=new Date(this.all_dates_F[i]['dt']*1000).toString()
        let dt2=dt1.substring(0,dt1.lastIndexOf("2022")+4)
         if(!this.temprture_Day_WiseEntry_C.has(dt2)){
          this.temprture_Day_WiseEntry_C.set(dt2,this.all_dates_C[i]["main"]["temp"])
          this.array_DateC.push(dt2)
          this.array_C.push(this.all_dates_C[i]["main"]["temp"])
        }
        
      }
    })


    this.callApi.getApiF(search).subscribe(res=>{
      this.weatherF=res
      this.all_dates_F=this.weatherF['list']
      this.temprture_Day_WiseEntry_F=new Map()
      this.array_F=[]
      
     for(let i in this.all_dates_F){
      let dt1=new Date(this.all_dates_F[i]['dt']*1000).toString()
      let dt2=dt1.substring(0,dt1.lastIndexOf("2022")+4)
       if(!this.temprture_Day_WiseEntry_F.has(dt2)){
        this.temprture_Day_WiseEntry_F.set(dt2,this.all_dates_F[i]["main"]["temp"])
        this.array_F.push(this.all_dates_F[i]["main"]["temp"])

      }
    }
    })
  }
  }

}
