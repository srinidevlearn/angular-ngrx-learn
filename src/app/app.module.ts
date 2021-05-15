import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { LayoutComponent } from './components/layout/layout.component';
import { OsmService } from './services/osm-service.service';
import { WeatherContainerComponent } from './container/weather-container/weather-container.component';
import { WeatherComponent } from './components/weather/weather.component';
import { CalcComponent } from './components/calc/calc.component';
import { CardComponent } from './components/card/card.component';
import { PictorialChartComponent } from './components/pictorial-chart/pictorial-chart.component';
import { ImageColumnChartComponent } from './components/image-column-chart/image-column-chart.component';
import { UvChartComponent } from './components/uv-chart/uv-chart.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, LayoutComponent, WeatherContainerComponent, WeatherComponent, CalcComponent, CardComponent, PictorialChartComponent, ImageColumnChartComponent, UvChartComponent ],
  providers: [OsmService], 
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
