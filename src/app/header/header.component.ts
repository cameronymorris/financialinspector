import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FinancialListRecord } from '../Interfaces/IFinancialList';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  incomeList: FinancialListRecord[];
  expensesList: FinancialListRecord[];
  constructor(private financialData: DataService) { }

  ngOnInit() {
    this.financialData.incomeObserve.subscribe(incomeList => this.incomeList = JSON.parse(localStorage.getItem('incomeList')) || incomeList);
    this.financialData.expenseObserve.subscribe(expensesList => this.expensesList = JSON.parse(localStorage.getItem('expenseList')) || expensesList);
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
