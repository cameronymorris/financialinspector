import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FinancialListRecord } from '../Interfaces/IFinancialList';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  language: string = "en";
  inspectionLists = {
    income: new Array<FinancialListRecord>(),
    expense: new Array<FinancialListRecord>()
  };
  private incomeSubscription;
  private expensesSubscription;
  private languageSubscription;
  totalExpenses: number;
  totalIncome: number;

  constructor(private financialData: DataService) { }

  ngOnInit() {
    this.incomeSubscription = this.financialData.incomeObserve.subscribe(incomeList => {
      this.inspectionLists.income = incomeList;
      this.totalIncome = this.getSum(incomeList);
    });
    this.expensesSubscription = this.financialData.expenseObserve.subscribe(expensesList => {
      this.inspectionLists.expense = expensesList;
      this.totalExpenses = this.getSum(expensesList);
    });
    this.languageSubscription = this.financialData.languageObserve.subscribe(language => {
      this.language = language;
    })
  }

  ngOnDestroy() {
    this.incomeSubscription.unsubscribe();
    this.expensesSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
  }

  private getSum(list: FinancialListRecord[]): number{
    return list.reduce((total, el) => total + el.value, 0);
  }

  private languageChanged(){
    console.log(this.language);
    this.financialData.switchLanguage(this.language);
  }
}
