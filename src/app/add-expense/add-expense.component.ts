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
  constructor(private financialData: DataService) { }

  ngOnInit() {
    this.financialData.incomeObserve.subscribe(incomeList => this.incomeList = JSON.parse(localStorage.getItem('incomeList')) || incomeList);
    this.financialData.expenseObserve.subscribe(expensesList => this.expensesList = JSON.parse(localStorage.getItem('expenseList')) || expensesList);
  }

  addItem(str: string){
      let objToPush = {
        name: this.description,
        value: this.value
      }
      if(this.value != null && this.description != ""){
      if(str == 'expense'){
        this.expensesList.push(objToPush);
        localStorage.setItem('expenseList', JSON.stringify(this.expensesList));
        this.financialData.updateExpenses(this.expensesList);
      } else if(str == 'income'){
        console.log(this.incomeList);
        console.log(this.expensesList);
        this.incomeList.push(objToPush);
        localStorage.setItem('incomeList', JSON.stringify(this.incomeList));
        this.financialData.updateIncome(this.incomeList);
      }
      else{
        console.log(str);
        alert("Check the sign value in console");
      }
      this.description = "";
      this.value = null;
    }else{
      return
    }
  }
}
