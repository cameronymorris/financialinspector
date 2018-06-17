import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FinancialListRecord } from './Interfaces/IFinancialList';

@Injectable()

export class DataService {
  private incomeList = new BehaviorSubject<FinancialListRecord[]>([]);
  private expensesList = new BehaviorSubject<FinancialListRecord[]>([]);
  incomeObserve = this.incomeList.asObservable();
  expenseObserve = this.expensesList.asObservable();

  constructor() { }

  updateIncome(newIncomeList: FinancialListRecord[]){
    this.incomeList.next(newIncomeList);
  }

  updateExpenses(newExpensesList: FinancialListRecord[]){
    this.expensesList.next(newExpensesList);
  }
}
