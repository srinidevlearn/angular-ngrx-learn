import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { LayoutComponent } from './components/layout/layout.component';
import { OsmService } from './services/osm-service.service';

import { WeatherComponent } from './components/weather/weather.component';
import { CalcComponent } from './components/calc/calc.component';
import { CardComponent } from './components/card/card.component';
import { PictorialChartComponent } from './components/pictorial-chart/pictorial-chart.component';
import { ImageColumnChartComponent } from './components/image-column-chart/image-column-chart.component';
import { UvChartComponent } from './components/uv-chart/uv-chart.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule,BrowserAnimationsModule,HttpClientModule ],
  declarations: [ AppComponent, HelloComponent, LayoutComponent, WeatherComponent, CalcComponent, CardComponent, PictorialChartComponent, ImageColumnChartComponent, UvChartComponent ],
  providers: [OsmService], 
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
