import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(financialList: any, searchField: any): any {
    if(searchField === undefined){
       return financialList;
    } else{
      console.log(financialList);
      return financialList.filter( el => el.toLowerCase().includes(searchField.toLowerCase()));
    }
  }
}
