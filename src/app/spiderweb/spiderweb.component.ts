import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-spiderweb',
  templateUrl: './spiderweb.component.html',
  styleUrls: ['./spiderweb.component.css']
})
export class SpiderwebComponent {

  
  Highcharts=Highcharts
  chartOptions={}

  constructor(){
    this.chartOptions={

        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45
            }
        },
        title: {
            text: 'Product Sales',
            align: 'left'
        },
        subtitle: {
            align: 'left'
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45
            }
        },
        series: [{
            name: 'Medals',
            data: [
                ['Bags', 16],
                ['Wallets', 12],
                ['Keyholders', 8],
                ['Other', 8],
                ['Cases', 8],
               
    
            ]
        }]   

    }
  }

 }