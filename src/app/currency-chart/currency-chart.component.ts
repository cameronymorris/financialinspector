import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Observable } from 'rxjs';
import { ICUrrencyAPI } from '../Interfaces/ICurrencyAPI';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-currency-chart',
  templateUrl: './currency-chart.component.html',
  styleUrls: ['./currency-chart.component.less']
})
export class CurrencyChartComponent implements OnInit {
  gbpRates = [];
  eurRates = [];
  dates = [];
  gbpRatesValues = [];
  eurRatesValues = [];
  test = [1.4,2, 2, 3];
  //canvas = <HTMLCanvasElement> document.getElementById('canvas');
  //ctx = this.canvas.getContext('2d');
  chart: Chart;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    //console.log(this.canvas);
    console.log(document);
    this.currencyService.getUsdToGbpRates()
      .subscribe(res => {
        this.gbpRates = res.dataset_data.data;
        this.dates = this.gbpRates.map(el => el[0]);
        this.gbpRatesValues = this.gbpRates.map(el => el[1]);
        console.log(this.gbpRatesValues)
      });
    
    this.currencyService.getUsdToEurUrlRates()
      .subscribe(res => {
        this.eurRates = res.dataset_data.data;
        this.eurRatesValues = this.eurRates.map(el => el[1]);
        console.log(this.eurRatesValues);
      })

      this.chart = new Chart('canvas', {
        type: 'line',
			data: {
				labels: this.dates,
				datasets: [{
					label: 'USD To EUR',
					borderColor: '#3cba9f',
					data: this.popa,
					fill: true,
				}, {
					label: 'USD To GBP',
					fill: false,
					borderColor: '#ffcc00',
					data: this.gbpRatesValues,
				}]
      },
      options: {
				responsive: true,
				title: {
					display: true,
					text: 'Chart.js Line Chart'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Date'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Value'
						}
					}]
				}
			}
    })
  }
}
