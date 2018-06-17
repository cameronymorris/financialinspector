import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  incomeList: { name: string, value: number }[];
  expensesList: { name: string, value: number }[];
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.incomeObserve.subscribe(incomeList => this.incomeList = JSON.parse(localStorage.getItem('incomeList')) || incomeList);
    this.data.expenseObserve.subscribe(expensesList => this.expensesList = JSON.parse(localStorage.getItem('expenseList')) || expensesList);
  }

  getIncome(){
    let res: number = 0;
    res += this.incomeList.reduce(function(total, el)
    { return total + el.value}, 0);
    return res;
  }

  getExpenses(){
    let res: number = 0;
    res += this.expensesList.reduce(function(total, el)
    { return total + el.value}, 0);
    return res;
  }
}
