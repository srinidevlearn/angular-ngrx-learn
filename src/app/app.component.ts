import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
 
})
export class AppComponent  {
  name = 'Angular';
  lookFor = "weather";
  constructor(){}
  ngOnInit(){

    this.selectApp(this.lookFor);
  }
  selectApp=(e)=>{
    this.lookFor = e.menu;
  }
}
