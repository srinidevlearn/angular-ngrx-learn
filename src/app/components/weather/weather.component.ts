import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { EMPTY, from, Observable, of, Subject, Subscription } from "rxjs";
import {
  debounceTime,
  delay,
  filter,
  map,
  mergeMap,
  switchMap,
  takeUntil,
  tap,
} from "rxjs/operators";

import { DailyWeather } from "../../interfaces/interface";
import { KEY, res, sevenDaysCast } from "../../../assets/key";
declare const am4core: any;
declare const am4themes_animated: any;
declare const am4charts: any;
declare const am4themes_kelly: any;

declare const am4themes_material: any;
declare const am4themes_frozen: any;
@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"],
  animations: [
    trigger("bubbleGrow", [
      transition(":enter", [
        animate(
          "550ms ease-in-out",
          keyframes([
            style({ transform: "scaleY(0)" }),
            style({ transform: "scaleY(1.1)" }),
            style({ transform: "scaleY(1)" }),
          ])
        ),
      ]),
      transition(":leave", [
        animate(
          "1550ms ease-in-out",
          keyframes([
            // style({transform: 'translateX(1)'}),
            // style({transform: 'scale(1.1)'}),
            // style({transform: 'scale(0)'})
            style({ transform: "scaleX(1)" }),
            //  style({transform: 'scaleX(1.1)'}),
            style({ transform: "scaleX(0)" }),
          ])
        ),
      ]),
    ]),
  ],
})
export class WeatherComponent implements OnInit {
  response: any = {};
  sevenDayRes: any = {};
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

    snow: `assets/w_icons/animated/snowy-5.svg`,
  };
  currentDay: any = {};
  currentDayImage: any = {};
  currentDayTemp: any = {};
  loader:boolean=false;

  weatherApiSub = new Subject<string>();
  public readonly cityName$: Observable<string> =
    this.weatherApiSub.asObservable();
  sub: Subscription;
  now: number;

  constructor(private http: HttpClient) {
    this.response = res();
    this.sevenDayRes = sevenDaysCast();
  }
  
  ngOnInit(): void {
    this.currentDay = null;
    
    this.sevenDayDataFramer(this.sevenDayRes);
    // this.inputEvent('mumbai')
   

    this.sub = this.cityName$.pipe(
      debounceTime(2500),
      mergeMap(data => {
        this.loader = true;
        return data && data.length > 2 && this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${KEY()}&units=metric`);
        // return data;

      }),
      mergeMap((data: any) => {
        this.response = data;
        let { coord } = data;
        console.log(coord);
        return coord != undefined && this.http.get(`http://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${KEY()}&units=metric`);
      })
    )
      .subscribe((res) => {
        this.sevenDayDataFramer(res);
        this.loader = false;
      }, (err) => {
        console.log(err)
        let { error } = err;
        alert(`${error.message}
          Please reload to refresh data
          `)
      })
    // this.feelsLikeChart();
  }

  ngAfterViewInit() {

    // of(true).pipe(delay(1000)).toPromise().then(_=>this.inputEvent('delhi'));

    // .pipe(debounceTime(2500),
    //   // delay(200),
    //   map((data) => {
    //     console.log(data);
    //     return this.http
    //       .get(
    //         `http://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${KEY()}`
    //       ).pipe(map(d=>{
    //         console.log(d)
    //         return d;
    //       })),mergeMap((data: any) => {{
    //         console.log(data);
    //     let { coord } = data;
    //       })
    //   }), mergeMap((data: any) => {
    //     console.log(data);
    //     let { coord } = data;
    //     console.log(`http://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon={coord.lon}&appid=${KEY()}`)
    //     return `http://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon={coord.lon}&appid=${KEY()}`;
    //     // return data;
    //     // return this.http
    //     //   .get(
    //     //     `http://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon={coord.lon}&appid=${KEY()}`
    //     //   )

    //   })).subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  inputEvent(e: any) {
    let value = typeof e === 'string' ? e : e.target.value;
console.log(value)
    this.weatherApiSub.next(value);
  }


  sevenDayDataFramer(data) {
    this.now = new Date().getTime()
    this.sevenDayRes = data.daily
      .map((dayReport: DailyWeather, index) => {
        let temp = {
          day: dayReport.dt * 1000,
          weather: dayReport.weather[0]["main"],
          uvi: dayReport.uvi,
          min: dayReport.temp.min.toString(),
          max: dayReport.temp.max.toString(),
          sunrise: dayReport.sunrise * 1000,
          sunset: dayReport.sunset * 1000,
          moonrise: dayReport.moonrise * 1000,
          moonset: dayReport.moonset * 1000,
          humidity: dayReport.humidity,
          desc: dayReport.weather[0].description.toLowerCase(),
          feels_alike: dayReport.feels_like.day.toString(),
          wind_speed: dayReport.wind_speed,
          percipitation: dayReport.pop,
          dew_point: dayReport.dew_point,
          pressure: dayReport.pressure,
        };
        if (index <= 7 && index > 0) {
          return temp;
        } else if (index === 0) {
          this.currentDay = temp;
          this.currentDayTemp = dayReport.feels_like;
          // console.log(this.currentDay)
        } else if (index === data.daily.length) {
          this.currentDay.day = this.sevenDayRes.current.dt * 1000;
        }
      })
      .filter((i) => i);
  }
}
