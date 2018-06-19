import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FinancialListRecord } from './Interfaces/IFinancialList';

@Injectable()

export class DataService {
  // private incomeList = new BehaviorSubject<FinancialListRecord[]>([]);
  // private expensesList = new BehaviorSubject<FinancialListRecord[]>([]);
  inspectionLists = {
    income : new BehaviorSubject<FinancialListRecord[]>([]),
    expense : new BehaviorSubject<FinancialListRecord[]>([])
  };
  incomeObserve = this.inspectionLists.income.asObservable();
  expenseObserve = this.inspectionLists.expense.asObservable();

  constructor() { 
    if(JSON.parse(localStorage.getItem('expenseList')) != null){
      this.inspectionLists.expense.next(JSON.parse(localStorage.getItem('expenseList')));
      //this.updateList(JSON.parse(localStorage.getItem('expenseList')), "expense");
    }
    if(JSON.parse(localStorage.getItem('incomeList')) != null){
      this.inspectionLists.income.next(JSON.parse(localStorage.getItem('incomeList')));
      //this.updateList(JSON.parse(localStorage.getItem('incomeList')));
    }
  }

  updateList(newList: FinancialListRecord[], listType: string){
    this.inspectionLists[listType].next(newList);
    localStorage.setItem(this.inspectionLists[listType] + 'List', JSON.stringify(newList));
  }
}
