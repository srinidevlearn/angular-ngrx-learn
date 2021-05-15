import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {


  activeClass = "weather"

  @Output() selectedMenu = new EventEmitter()

  constructor() { }

  ngOnInit(): void {

    this.clickActive(this.activeClass)
  }

  clickActive(menu: string) {
    this.activeClass = menu;
    this.selectedMenu.emit({ menu })
  }

}
