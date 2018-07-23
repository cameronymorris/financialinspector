import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FinancialListRecord } from '../Interfaces/IFinancialList';
import { CurrencyObject } from '../Interfaces/ICurrencyObject';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  encapsulation: ViewEncapsulation.None
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
  totalExpenses: CurrencyObject[] = [];
  totalIncome: CurrencyObject[] = [];
  moneyLeft: CurrencyObject[];

  constructor(private financialData: DataService) { }

  ngOnInit() {
    this.incomeSubscription = this.financialData.incomeObserve.subscribe(incomeList => {
      this.inspectionLists.income = incomeList;
      this.totalIncome = this.getSum(incomeList);
      this.moneyLeft = this.getMoneyLeft(this.totalExpenses.concat(this.totalIncome));
    });
    this.expensesSubscription = this.financialData.expenseObserve.subscribe(expensesList => {
      this.inspectionLists.expense = expensesList;
      this.totalExpenses = this.getSum(expensesList);
      this.moneyLeft = this.getMoneyLeft(this.totalExpenses.concat(this.totalIncome));
    });
    this.languageSubscription = this.financialData.languageObserve.subscribe(language => {
      this.language = language;
    });
  }

  ngOnDestroy() {
    this.incomeSubscription.unsubscribe();
    this.expensesSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
  }

  private getSum(list: FinancialListRecord[]): CurrencyObject[]{
    let currencyList: CurrencyObject[] = [];
    for(let i = 0; i < this.financialData.currencyArray.length; i++){
      currencyList.push({
        'value' : list.reduce((total, el) =>
          (el.currency == this.financialData.currencyArray[i]) ? 
            (el.sign == 'income') ? total + el.value : total - el.value : total, 0),
        'currency' : this.financialData.currencyArray[i],
      });
    }
    return currencyList.filter(el => el.value != 0 );
  }

  private getMoneyLeft(mergedList: CurrencyObject[]): CurrencyObject[]{
    let moneyLeftList: CurrencyObject[] = [];
    for(let i = 0; i < this.financialData.currencyArray.length; i++){
      moneyLeftList.push({
        'value' : mergedList.reduce((total, el) =>
          (el.currency == this.financialData.currencyArray[i]) ? total + el.value : total, 0),
        'currency' : this.financialData.currencyArray[i]
      });
    }
    return moneyLeftList.filter(el => el.value != 0);
  }
  

  private languageChanged(){
    console.log('lang changed');
    console.log(this.language);
    this.financialData.switchLanguage(this.language);
  }
}
