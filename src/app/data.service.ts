import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FinancialListRecord } from './Interfaces/IFinancialList';
import { TranslateService } from '@ngx-translate/core';

@Injectable()

export class DataService {
  language = new BehaviorSubject<string>("en");
  searchfield = new BehaviorSubject<string>("");
  currencyArray: Array<string> = ['UAH', 'USD', 'EUR', 'GBP'];
  inspectionLists = {
    income : new BehaviorSubject<FinancialListRecord[]>([]),
    expense : new BehaviorSubject<FinancialListRecord[]>([])
  };
  incomeObserve = this.inspectionLists.income.asObservable();
  expenseObserve = this.inspectionLists.expense.asObservable();
  languageObserve = this.language.asObservable();
  searchFieldObserve = this.searchfield.asObservable();

  constructor(private translate: TranslateService) { 
    if(JSON.parse(localStorage.getItem('expenseList')) != null){
      this.inspectionLists.expense.next(JSON.parse(localStorage.getItem('expenseList')));
    }
    if(JSON.parse(localStorage.getItem('incomeList')) != null){
      this.inspectionLists.income.next(JSON.parse(localStorage.getItem('incomeList')));
    }
    if((localStorage.getItem('language')) != null){
      this.language.next(localStorage.getItem('language'));
    }
  }

  updateList(newList: FinancialListRecord[], listType: string){
    this.inspectionLists[listType].next(newList);
    localStorage.setItem(listType + 'List', JSON.stringify(newList));
  }

  switchLanguage(language: string) {
    this.language.next(language);
    localStorage.setItem('language', language);
    this.translate.use(language);
  }

  updateSearchString(searchfield){
    this.searchfield.next(searchfield);
  }
}
