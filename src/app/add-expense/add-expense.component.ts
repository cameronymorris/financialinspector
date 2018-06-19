import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { FinancialListRecord } from '../Interfaces/IFinancialList';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.less']
})
export class AddExpenseComponent implements OnInit {
  currentSign: string = "income";
  description: string = "";
  value: number;
  // incomeList: FinancialListRecord[];
  // expensesList: FinancialListRecord[];
  inspectionLists = {
    income: new Array<FinancialListRecord>(),
    expense: new Array<FinancialListRecord>()
  };
  private incomeSubscription;
  private expensesSubscription;
  constructor(private financialData: DataService) { }

  ngOnInit() {
    this.incomeSubscription = this.financialData.incomeObserve.subscribe(incomeList => this.inspectionLists.income = incomeList);
    this.expensesSubscription = this.financialData.expenseObserve.subscribe(expensesList => this.inspectionLists.expense = expensesList);
  }

  ngOnDestroy() {
    this.incomeSubscription.unsubscribe();
    this.expensesSubscription.unsubscribe();
  }

  addItem(signValue: string, form: NgForm){
    console.log(form);
      let objToPush = {
        name: this.description,
        value: this.value
      }
      if(this.value != null && this.description != ""){
        console.log(signValue);
        console.log(this.inspectionLists[signValue]);
        this.inspectionLists[signValue].push(objToPush);
        this.financialData.updateList(this.inspectionLists[signValue], signValue);
      }
      this.description = "";
      this.value = null;
  }
}
