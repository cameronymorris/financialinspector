import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { FinancialListRecord } from '../Interfaces/IFinancialList';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.less'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class ExpenseListComponent implements OnInit {
  // incomeList: FinancialListRecord[];
  // expensesList: FinancialListRecord[];
  inspectionLists = {
    income: this.financialData.incomeObserve,
    expense: this.financialData.expenseObserve
  };
  // private incomeSubscription;
  // private expensesSubscription;

  constructor(private financialData: DataService) { }

  ngOnInit() {
    // this.incomeSubscription = this.financialData.incomeObserve.subscribe(incomeList => this.inspectionLists.income = incomeList);
    // this.expensesSubscription = this.financialData.expenseObserve.subscribe(expensesList => this.inspectionLists.expense = expensesList);
  }

  // ngOnDestroy() {
  //   this.incomeSubscription.unsubscribe();
  //   this.expensesSubscription.unsubscribe();
  // }

  deleteItem(list, index, name){
    this.inspectionLists[name].splice(index, 1);
    //list.splice(index, 1);
    this.financialData.updateList(this.inspectionLists[name], name);
  }
}
