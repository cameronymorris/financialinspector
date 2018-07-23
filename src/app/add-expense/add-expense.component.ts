import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { FinancialListRecord } from '../Interfaces/IFinancialList';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.less']
})
export class AddExpenseComponent implements OnInit {
  currentSign: string = "income";
  language: string;

  itemAddForm: FormGroup;
  post: any;
  sign: string = '';
  value: number;
  description: string = "";
  currency: string = "";

  inspectionLists = {
    income: new Array<FinancialListRecord>(),
    expense: new Array<FinancialListRecord>()
  };

  private incomeSubscription;
  private expensesSubscription;
  private languageSubscription;
  constructor(private financialData: DataService, private fb: FormBuilder) {
    this.itemAddForm = fb.group({
      'sign': ["income", Validators.required],
      'value': [null, Validators.required],
      'description': [null, Validators.required],
      'currency': ["UAH", Validators.required]
    })
  }

  ngOnInit() {
    this.incomeSubscription = this.financialData.incomeObserve.subscribe(incomeList => this.inspectionLists.income = incomeList);
    this.expensesSubscription = this.financialData.expenseObserve.subscribe(expensesList => this.inspectionLists.expense = expensesList);
    this.languageSubscription = this.financialData.languageObserve.subscribe(language => {
      this.language = language;
    })
  }

  ngOnDestroy() {
    this.incomeSubscription.unsubscribe();
    this.expensesSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
  }

  addItem(formValue){
      let objToPush = this.itemAddForm.value;
      if(this.itemAddForm.valid){
        this.inspectionLists[formValue.sign].push(objToPush);
        this.financialData.updateList(this.inspectionLists[formValue.sign], formValue.sign);
      }
      this.itemAddForm.reset({sign: formValue.sign, currency: formValue.currency});
  }
}
