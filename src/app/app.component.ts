import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  animations: [
    trigger('fade', [
      transition('* => *', [ // using status here for transition
        style({ height: 0 }),
        animate(3000, style({ height: 0 }))
      ]),
      transition('* => *', [
        animate(1000, style({ height: 100 }))
      ])
    ])
  ]
})
export class AppComponent  {
  name = 'Angular';
  lookFor = ""
  selectApp=(e)=>{
    this.lookFor = e.menu;
  }
}
