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
  incomeList: FinancialListRecord[];
  expensesList: FinancialListRecord[];
  private incomeSubscription;
  private expensesSubscription;

  constructor(private financialData: DataService) { }

  ngOnInit() {
    this.incomeSubscription = this.financialData.incomeObserve.subscribe(incomeList => this.incomeList = incomeList);
    this.expensesSubscription = this.financialData.expenseObserve.subscribe(expensesList => this.expensesList = expensesList);
  }

  ngOnDestroy() {
    this.incomeSubscription.unsubscribe();
    this.expensesSubscription.unsubscribe();
  }

  deleteItem(list, index, name){
    if(name == 'incomeList'){
      this.incomeList.splice(index, 1);
      this.financialData.updateIncome(this.incomeList);
    } else if (name == 'expensesList'){
      this.expensesList.splice(index, 1);
      this.financialData.updateExpenses(this.expensesList);
    } else{
      return;
    }
  }
}
