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
    this.data.incomeObserve.subscribe(incomeList => this.incomeList = incomeList);
    this.data.expenseObserve.subscribe(expensesList => this.expensesList = expensesList);
  }
}
