import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.less']
})
export class AddExpenseComponent implements OnInit {
  currentSign: string = "income";
  description: string = "";
  value: number;
  incomeList: { name: string, value: number }[];
  expensesList: { name: string, value: number }[];
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.incomeObserve.subscribe(incomeList => this.incomeList = JSON.parse(localStorage.getItem('incomeList')) || incomeList);
    this.data.expenseObserve.subscribe(expensesList => this.expensesList = JSON.parse(localStorage.getItem('expenseList')) || expensesList);
  }

  addItem(str: string){
      let objToPush = {
        name: this.description,
        value: this.value
      }
      console.log("in another component");
      console.log(this.incomeList);
      if(this.value != null && this.description != ""){
      if(str == 'expense'){
        this.expensesList.push(objToPush);
        localStorage.setItem('expenseList', JSON.stringify(this.expensesList));
        this.data.checkExpenses(this.expensesList);
      } else if(str == 'income'){
        this.incomeList.push(objToPush);
        localStorage.setItem('incomeList', JSON.stringify(this.incomeList));
        this.data.checkIncome(this.incomeList);
      }
      else{
        console.log(str);
        alert("Check the sign value in console");
      }
      console.log("Income List");
      console.log(this.incomeList);
      this.description = "";
      this.value = null;
    }else{
      return
    }
  }
}
