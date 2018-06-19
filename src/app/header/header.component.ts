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
  private incomeSubscription;
  private expensesSubscription;
  totalExpenses: number;
  totalIncome: number;

  constructor(private financialData: DataService) { }

  ngOnInit() {
    this.incomeSubscription = this.financialData.incomeObserve.subscribe(incomeList => {
      this.incomeList = incomeList;
      this.totalIncome = this.getSum(incomeList);
    });
    this.expensesSubscription = this.financialData.expenseObserve.subscribe(expensesList => {
      this.expensesList = expensesList;
      this.totalExpenses = this.getSum(expensesList);
    });
  }

  ngOnDestroy() {
    this.incomeSubscription.unsubscribe();
    this.expensesSubscription.unsubscribe();
  }

  private getSum(list: FinancialListRecord[]): number{
    let res: number = 0;
    res += list.reduce(function(total, el)
    { return total + el.value}, 0);
    return res;
  }
}
