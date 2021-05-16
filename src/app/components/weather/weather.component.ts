import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DailyWeather } from 'src/app/interfaces/interface';
import { res, sevenDaysCast } from "src/assets/key";
declare const am4core: any;
declare const am4themes_animated: any;
declare const am4charts: any
declare const am4themes_kelly: any;

declare const am4themes_material: any;
declare const am4themes_frozen: any;
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  animations: [
    trigger('bubbleGrow', [
      transition(':enter', [
        animate('550ms ease-in-out',  keyframes([
          style({transform: 'scaleY(0)'}),
          style({transform: 'scaleY(1.1)'}),
          style({transform: 'scaleY(1)'}),
        ]))
      ]),
      transition(':leave', [
        animate('1550ms ease-in-out',  keyframes([
          // style({transform: 'translateX(1)'}),
          // style({transform: 'scale(1.1)'}),
          // style({transform: 'scale(0)'})
          style({transform: 'scaleX(1)'}),
        //  style({transform: 'scaleX(1.1)'}),
          style({transform: 'scaleX(0)'})
        ]))
      ]),
    ])
  ]
})


export class WeatherComponent implements OnInit {

  response: any = {}
  sevenDayRes: any = {}
  imageAssets = {
    "clear sky": `assets/w_icons/animated/day.svg`,
    "few clouds": `assets/w_icons/animated/cloudy.svg`,
    "overcast clouds": `assets/w_icons/animated/cloudy.svg`,
    "light rain": `assets/w_icons/animated/rainy-4.svg`,
    "scattered clouds": `assets/w_icons/animated/cloudy.svg`,
    "moderate rain": `assets/w_icons/animated/rainy-5.svg`,
    "rain and snow": `assets/w_icons/animated/rainy-7.svg`,

    "broken clouds": `assets/w_icons/animated/cloudy.svg`,
    "heavy intensity rain": `assets/w_icons/animated/thunder.svg`,

    "snow": `assets/w_icons/animated/snowy-5.svg`,

  }
  currentDay: any;
  currentDayImage: any;
  currentDayTemp: any;




  constructor() {
    this.response = res();
    this.sevenDayRes = sevenDaysCast();
  }

  ngOnInit(): void {

    this.currentDay = null;


    this.sevenDayRes = this.sevenDayRes.daily.map((dayReport: DailyWeather, index) => {


      let temp = {
        day: dayReport.dt * 1000,
        weather: dayReport.weather[0]['main'],
        uvi: dayReport.uvi,
        min: dayReport.temp.min.toString(),
        max: dayReport.temp.max.toString(),
        sunrise: dayReport.sunrise * 1000,
        sunset: dayReport.sunset * 1000,
        moonrise:dayReport.moonrise *1000,
        moonset:dayReport.moonset *1000,
        humidity: dayReport.humidity,
        desc: dayReport.weather[0].description.toLowerCase(),
        feels_alike: dayReport.feels_like.day.toString(),
        wind_speed: dayReport.wind_speed,
        percipitation:dayReport.pop,
        dew_point:dayReport.dew_point,
        pressure:dayReport.pressure
      }
      if (index <= 7 && index > 0) {
        return temp;
      } else if (index === 0) {

        this.currentDay = temp;
        this.currentDay.day = this.sevenDayRes.current.dt * 1000
        this.currentDayTemp = dayReport.feels_like;
        console.log(this.currentDay)
      }

    }).filter(i => i);
   
   
    // this.feelsLikeChart();
  }




 
}




