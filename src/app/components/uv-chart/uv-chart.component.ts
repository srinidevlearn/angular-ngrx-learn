import { Component, Input, OnInit } from '@angular/core';
declare const am4core: any;
declare const am4themes_animated: any;
declare const am4charts: any
declare const am4themes_kelly: any;
@Component({
  selector: 'app-uv-chart',
  templateUrl: './uv-chart.component.html',
  styleUrls: ['./uv-chart.component.css']
})
export class UvChartComponent implements OnInit {
  @Input() currentDay: any;
  @Input() currentDayTemp: any;
  constructor() { }

  ngOnInit(): void {
    this.chartData();
  }


  chartData() {

    /* Chart code */
    // Themes begin
  
    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");
    // Themes end

    // create chart
    let chart = am4core.create("chartdiv", am4charts.GaugeChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    chart.innerRadius = -15;

    let axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
    axis.renderer.grid.template.strokeOpacity = 0.3;

    let colorSet = new am4core.ColorSet();

    let range0 = axis.axisRanges.create();
    range0.value = 0;
    range0.endValue = 40;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = am4core.color("rgba(126,87,194,0.3)");
    range0.axisFill.zIndex = - 1;

    let range1 = axis.axisRanges.create();
    range1.value = 40;
    range1.endValue = 80;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = am4core.color("rgba(126,87,194,0.6)");
    range1.axisFill.zIndex = -1;

    let range2 = axis.axisRanges.create();
    range2.value = 80;
    range2.endValue = 100;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = am4core.color("rgba(126,87,194,0.8)");
    range2.axisFill.zIndex = -1;

    let hand = chart.hands.push(new am4charts.ClockHand());
    hand.pin.disabled = true;
    hand.fill = am4core.color("#fff");
    hand.stroke = am4core.color("#fff");
    hand.innerRadius = am4core.percent(50);
    hand.radius = am4core.percent(80);
    hand.startWidth = 10;
    // using chart.setTimeout method as the timeout will be disposed together with a chart
    hand.showValue(Math.round(+this.currentDay.uvi))


  }
}
