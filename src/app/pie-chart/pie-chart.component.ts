import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {

  Highcharts=Highcharts
  chartOptions={}

  constructor(){

    this.chartOptions={
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Sales by Traffic Source',
            align: 'left'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Search',
                y: 12.82
            },  {
                name: 'Direct',
                y: 4.63
            }, {
                name: 'Social',
                y: 2.44
            }, {
                name: 'Email',
                y: 2.02
            }, {
                name: 'Unknown',
                y: 3.28
            }]
        }]
    
    

      
     
      
    }

  }

}
