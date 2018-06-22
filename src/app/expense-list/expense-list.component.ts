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
  searchField: string = "";
  language: string;
  income: string = "income";
  expense: string = 'expense';
  colors = {
    income: '#80ba2a',
    expense: '#ba332a'
  }
  inspectionLists = {
    income: new Array<FinancialListRecord>(),
    expense: new Array<FinancialListRecord>()
  };

  inspectionListsToPass = {
    income: new Array<FinancialListRecord>(),
    expense: new Array<FinancialListRecord>()
  }

  private incomeSubscription;
  private expensesSubscription;
  private languageSubscription;
  private searchfieldSubscription;

  constructor(private financialData: DataService) {}

  ngOnInit() {
    this.incomeSubscription = this.financialData.incomeObserve.subscribe(incomeList => {
      this.inspectionLists.income = incomeList;
      this.inspectionListsToPass.income = this.getFilteredList(this.inspectionLists.income, this.searchField);

      //this.getFilteredList(this.inspectionLists.income, this.searchField);
    });
    this.expensesSubscription = this.financialData.expenseObserve.subscribe(expensesList => {
      this.inspectionLists.expense = expensesList;
      this.inspectionListsToPass.expense = this.getFilteredList(this.inspectionLists.expense, this.searchField);
      //this.getFilteredList(this.inspectionLists.expense, this.searchField);
    });
    this.languageSubscription = this.financialData.languageObserve.subscribe(language => {
      this.language = language;
    });
    this.searchfieldSubscription = this.financialData.searchFieldObserve.subscribe(searchField => {
      this.searchField = searchField;
      this.inspectionListsToPass.income = this.getFilteredList(this.inspectionLists.income, this.searchField);
      this.inspectionListsToPass.expense = this.getFilteredList(this.inspectionLists.expense, this.searchField);
    })
  }

  ngOnDestroy() {
    this.incomeSubscription.unsubscribe();
    this.expensesSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
  }

  getFilteredList(list: FinancialListRecord[], searchField: string){
    if(searchField === undefined){
      return list;
   } else{
     return list.filter( el => el.description.toLowerCase().includes(searchField.toLowerCase()));
   }
  }

  searchChange(e){
    this.financialData.updateSearchString(e.target.value);
  }
}
