import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { FinancialListRecord } from '../Interfaces/IFinancialList';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.less']
})
export class AddExpenseComponent implements OnInit {
  currentSign: string = "income";
  description: string = "";
  value: number;
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

  addItem(signValue: string){
      let objToPush = {
        name: this.description,
        value: this.value
      }
      if(this.value != null && this.description != ""){
      if(signValue == 'expense'){
        this.expensesList.push(objToPush);
        this.financialData.updateExpenses(this.expensesList);
      } else if(signValue == 'income'){
        this.incomeList.push(objToPush);
        this.financialData.updateIncome(this.incomeList);
      }
      else{
        console.log(signValue);
        alert("Check the sign value in console");
      }
      this.description = "";
      this.value = null;
    }else{
      return
    }
  }
}
