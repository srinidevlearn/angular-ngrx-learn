import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { LayoutComponent } from './components/layout/layout.component';
import { OsmService } from './services/osm-service.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, LayoutComponent,OsmService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
