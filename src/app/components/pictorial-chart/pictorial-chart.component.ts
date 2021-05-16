import { Component, Input, OnInit } from '@angular/core';
declare const am4core: any;
declare const am4themes_animated: any;
declare const am4charts: any
declare const am4themes_kelly: any;

declare const am4themes_material: any;
declare const am4themes_frozen: any;
@Component({
  selector: 'app-pictorial-chart',
  templateUrl: './pictorial-chart.component.html',
  styleUrls: ['./pictorial-chart.component.css']
})
export class PictorialChartComponent implements OnInit {
  chartData = [{
    "name": "Dryness",
    "value": 0,
    "disabled": true,
    "color": am4core.color('#90caf9'),

  }, {
    "name": "Humidity",
    "value": 0,
    "color": am4core.color("#42a5f5")

  }]

  @Input() set currentDay(value:any){
//100 - this.currentDay.humidity
//this.currentDay.humidity

// this.chart.data = 
this.humidity_chart(this.chartData.map(item=>{
    item.value = item.name.toLowerCase() === 'dryness' ? 100 - value.humidity : value.humidity;
    return item}))
// 
// })
  }
  @Input() currentDayTemp:any;
  chart: any;
  constructor() { }

  ngOnInit(): void {
  
    this.humidity_chart(this.chartData);
  }

  
  humidity_chart(data:any) {
    /**
     * ---------------------------------------
     * This demo was created using amCharts 4.
     * 
     * For more information visit:
     * https://www.amcharts.com/
     * 
     * Documentation is available at:
     * https://www.amcharts.com/docs/v4/
     * ---------------------------------------
     */

    // Themes begin
    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");
  
    
    // am4core.useTheme(am4themes_kelly);

    // Themes end

    var iconPath = "M12,2c-5.33,4.55-8,8.48-8,11.8c0,4.98,3.8,8.2,8,8.2s8-3.22,8-8.2C20,10.48,17.33,6.55,12,2z M7.83,14 c0.37,0,0.67,0.26,0.74,0.62c0.41,2.22,2.28,2.98,3.64,2.87c0.43-0.02,0.79,0.32,0.79,0.75c0,0.4-0.32,0.73-0.72,0.75 c-2.13,0.13-4.62-1.09-5.19-4.12C7.01,14.42,7.37,14,7.83,14z"

    var chart = am4core.create("humiditychartdiv", am4charts.SlicedChart);
    chart.hiddenState.properties.opacity = 1; // this makes initial fade in effect
    // chart.paddingLeft = 150;
    am4core.addLicense("ch-custom-attribution");
    this.chart = chart;

    chart.data = data;

    // console.log(chart)

    var series = chart.series.push(new am4charts.PictorialStackedSeries());
    // series.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
    // series.renderer.grid.template.strokeOpacity = 0.3;
    // series.baseColor = '#eee'
    
    series.dataFields.value = "value";
    series.dataFields.category = "name";
    // series.alignLabels = true;
    // this makes only A label to be visible
    series.labels.template.propertyFields.disabled = "disabled";
    series.ticks.template.propertyFields.disabled = "disabled";
    series.slices.template.propertyFields.fill = "color";

    // am4core.color("#eee")
  


    series.maskSprite.path = iconPath;
    series.ticks.template.locationX = 0;
    series.ticks.template.locationY = -0.2;


    series.labelsContainer.width = 250;

    // chart.legend = new am4charts.Legend();
    // chart.legend.position = "top";
    // chart.legend.paddingRight = 160;
    // chart.legend.paddingBottom = 40;
    // let marker = chart.legend.markers.template.children.getIndex(0);
    // chart.legend.markers.template.width = 20;
    // chart.legend.markers.template.height = 20;
    // marker.cornerRadius(20,20,20,20);
  }
  ngOnDestroy(){
    this.chart.dispose();
  }
}
