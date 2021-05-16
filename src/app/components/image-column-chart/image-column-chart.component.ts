import { Component, Input, OnInit } from '@angular/core';
declare const am4core: any;
declare const am4themes_animated: any;
declare const am4charts: any
declare const am4themes_kelly: any;

declare const am4themes_material: any;
declare const am4themes_frozen: any;
@Component({
  selector: 'app-image-column-chart',
  templateUrl: './image-column-chart.component.html',
  styleUrls: ['./image-column-chart.component.css']
})
export class ImageColumnChartComponent implements OnInit {
  
  @Input() currentDay:any;
  @Input() currentDayTemp:any;


  constructor() { }

  ngOnInit(): void {
    this.feelsLikeChart();
  }

  feelsLikeChart() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");
  
    // Themes end

    // Create chart instance
    var chart = am4core.create("feelslikechart", am4charts.XYChart);

    // Add data
    chart.data = [
      {
        "name": "morning",
        "points": this.currentDayTemp.morn,
        "color": 'rgba(127,87,194,0.8)',
        //chart.colors.next(),
        // "bullet": "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy-day-1.svg"
        "bullet": 'assets/w_icons/animated/cloudy-day-1.svg'
      }, {
        "name": "day",
        "points": this.currentDayTemp.day,
        "color": 'rgba(30,136,229,0.8)',
        //chart.colors.next(),
        "bullet": "assets/w_icons/animated/day.svg"
      }, {
        "name": "evening",
        "points": this.currentDayTemp.eve,
        "color": 'rgba(66,165,245,0.8)',
        //chart.colors.next(),
        "bullet": "assets/w_icons/animated/cloudy-night-1.svg"
      },{
        "name": "night",
        "points": this.currentDayTemp.night,
        "color": 'rgba(38,50,56,0.8)',
        //chart.colors.next(),
        "bullet": "assets/w_icons/animated/night.svg"
      },
      
    ];

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.inside = true;
    categoryAxis.renderer.labels.template.fill = am4core.color("#fff");
    categoryAxis.renderer.labels.template.fontSize = 8;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeDasharray = "5,5";
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;

    // Do not crop bullets
    chart.maskBullets = false;

    // Remove padding
    chart.paddingBottom = 0;

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "points";
    series.dataFields.categoryX = "name";
    series.columns.template.propertyFields.fill = "color";
    series.columns.template.propertyFields.stroke = "color";
    series.columns.template.column.cornerRadiusTopLeft = 50;
    series.columns.template.column.cornerRadiusTopRight = 50;
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/b] [/&#8451;] c";

    // Add bullets
    var bullet = series.bullets.push(new am4charts.Bullet());
    var image = bullet.createChild(am4core.Image);
    image.horizontalCenter = "middle";
    image.verticalCenter = "bottom";
    image.width = 35;
    image.height = 35;
    image.dy = 35;
    image.y = am4core.percent(100);
    image.propertyFields.href = "bullet";
    image.tooltipText = series.columns.template.tooltipText;
    image.propertyFields.fill = "color";
    image.filters.push(new am4core.DropShadowFilter());
  }

}
