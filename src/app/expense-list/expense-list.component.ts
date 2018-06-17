import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { FinancialListRecord } from '../Interfaces/IFinancialList';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.less']
})
export class ExpenseListComponent implements OnInit {
  incomeList: FinancialListRecord[];
  expensesList: FinancialListRecord[];

  constructor(private financialData: DataService) { }

  ngOnInit() {
    this.financialData.incomeObserve.subscribe(incomeList => this.incomeList = JSON.parse(localStorage.getItem('incomeList')) || incomeList);
    this.financialData.expenseObserve.subscribe(expensesList => this.expensesList = JSON.parse(localStorage.getItem('expenseList')) || expensesList);
  }

  deleteItem(list, index, name){
    if(name == 'incomeList'){
      this.incomeList.splice(index, 1);
      localStorage.setItem('incomeList', JSON.stringify(this.incomeList));
      console.log(this.incomeList);
      this.financialData.updateIncome(this.incomeList);
    } else if (name == 'expensesList'){
      this.expensesList.splice(index, 1);
      localStorage.setItem('expenseList', JSON.stringify(this.expensesList));
      this.financialData.updateExpenses(this.expensesList);
    } else{
      return;
    }
  }
}
