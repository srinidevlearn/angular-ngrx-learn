import { Component, OnInit } from "@angular/core";
declare const Finance: any;
declare const am4core: any;
declare const am4themes_animated: any;
declare const am4charts: any;
declare const am4themes_kelly: any;

declare const am4themes_material: any;
declare const am4themes_frozen: any;
@Component({
  selector: "app-calc",
  templateUrl: "./calc.component.html",
  styleUrls: ["./calc.component.css"],
})
export class CalcComponent implements OnInit {
  fx: any;

  emiInput = {
    amount: 215000,
    interest: 12,
    month: 24,
  };

  menu = [
    "sip calculator",
    "emi calculator",
    "ppf calculator",
    "home loan calculator",
    "car loan calculator",
  ];
  activeClass: string = this.menu[0];

  latestRate = 0;
  chart:any

  constructor() {
    this.fx = new Finance();
  }

  changeEvent() {
    (this.emiInput.amount =
      this.emiInput.amount && Number.isNaN(this.emiInput.amount) === false
        ? this.emiInput.amount
        : 1),
      (this.emiInput.interest =
        this.emiInput.interest && Number.isNaN(this.emiInput.interest) === false
          ? this.emiInput.interest
          : 1),
      (this.emiInput.month =
        this.emiInput.month && Number.isNaN(this.emiInput.month) === false
          ? this.emiInput.month
          : 1),
      (this.latestRate = this.fx.AM(
        this.emiInput.amount,
        this.emiInput.interest,
        this.emiInput.month,
        1
      ));
    this.pieChart();

    // const p = new Promise((res,rej)=>{
    // res(this.latestRate)
    // }).then(res=>{

    // })
  }

  ngOnInit(): void {
    this.clickActive(this.activeClass);
    this.changeEvent();
   
  }

  clickActive(item) {
    this.activeClass = item;
  }

  financeCI = () => {
    return this.fx.AM(20000, 13, 12, 1);
  };

  pieChart() {
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
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdivfinance", am4charts.PieChart);
    this.chart = chart;
    am4core.addLicense("ch-custom-attribution");

    let data = [
      {
        label: "Interest",
        value: Math.ceil(this.latestRate * this.emiInput.month - this.emiInput.amount),
        color: "#818cf8",
      },
      {
        label: "Loan",
        value: this.emiInput.amount,
        color: "#ff80ab",
      },
    ];

    // Add data
    chart.data = data;

    // Set inner radius
    chart.innerRadius = am4core.percent(60);

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "label";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    // pieSeries.slices.template.stroke = am4core.color("rgb(249, 168, 212)");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template.propertyFields.fill = "color";

    pieSeries.slices.template.tooltipText = "{category}: {value.value}";
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;
    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
    pieSeries.legendSettings.labelText = '{category}';
    pieSeries.legendSettings.valueText = '{value}';

    chart.legend = new am4charts.Legend();
    
    let label = pieSeries.createChild(am4core.Label);
    label.text = `Total ₹ ${Math.ceil(this.latestRate * this.emiInput.month)}`;
    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.fontFamily = 'Archivo, sans-serif'
    label.fontSize = 12;
    /**
     * 
     *  Interest Amount : ₹ ${Math.ceil(this.latestRate * this.emiInput.month - this.emiInput.amount)}
    Actual Amount : ₹ ${this.emiInput.month}
     */
  }

  ngOnDestroy(){
    this.chart.dispose();
  }
}
