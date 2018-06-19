import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FinancialListRecord } from './Interfaces/IFinancialList';

@Injectable()

export class DataService {
  private incomeList = new BehaviorSubject<FinancialListRecord[]>([]);
  private expensesList = new BehaviorSubject<FinancialListRecord[]>([]);
  incomeObserve = this.incomeList.asObservable();
  expenseObserve = this.expensesList.asObservable();

  constructor() { 
    if(JSON.parse(localStorage.getItem('expenseList')) != null){
      this.updateExpenses(JSON.parse(localStorage.getItem('expenseList')));
    }
    if(JSON.parse(localStorage.getItem('incomeList')) != null){
      this.updateIncome(JSON.parse(localStorage.getItem('incomeList')));
    }
  }

  updateIncome(newIncomeList: FinancialListRecord[]){
    console.log(newIncomeList);
    this.incomeList.next(newIncomeList);
    localStorage.setItem('incomeList', JSON.stringify(newIncomeList));
  }

  updateExpenses(newExpensesList: FinancialListRecord[]){
    this.expensesList.next(newExpensesList);
    localStorage.setItem('expenseList', JSON.stringify(newExpensesList));
  }
}
