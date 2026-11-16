import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent {

  Highcharts=Highcharts
  chartOptions={}

    constructor(){

      this.chartOptions={


        chart: {
          type: 'area'
      },
      title: {
          text: 'Monthly Revenue',
          align: 'left'
      },
      subtitle: {
        
          align: 'left'
      },
      xAxis: {
          categories: ['January', 'February', ' March', ' April', ' May', ' June',
              ' July', ' August', ' September', ' October', ' November' , ' December']
      },
      yAxis: {
          title: {
          }
      },
      credits: {
          enabled: false
      },
      series: [{
          name: 'Total Sales',
          data: [37.8, 29.3, 30.8, 36.8, 40.5, 35.3, 34.9, 43.6, 45.7, 35.9, 32.7
          ]
    
      }]
  
  

      }
    }

}
