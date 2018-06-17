import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.less']
})
export class ExpenseListComponent implements OnInit {
  incomeList: { name: string, value: number }[];
  expensesList: { name: string, value: number }[];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.incomeObserve.subscribe(incomeList => this.incomeList = JSON.parse(localStorage.getItem('incomeList')) || incomeList);
    this.data.expenseObserve.subscribe(expensesList => this.expensesList = JSON.parse(localStorage.getItem('expenseList')) || expensesList);
  }

  deleteItem(list, index, name){
    if(name == 'incomeList'){
      this.incomeList.splice(index, 1);
      localStorage.setItem('incomeList', JSON.stringify(this.incomeList));
      console.log(this.incomeList);
      this.data.checkExpenses(this.incomeList);
    } else if (name == 'expensesList'){
      this.expensesList.splice(index, 1);
      localStorage.setItem('expenseList', JSON.stringify(this.expensesList));
      this.data.checkExpenses(this.expensesList);
    } else{
      return;
    }
  }
}
