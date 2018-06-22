import { Component, OnInit, Input } from '@angular/core';
import { FinancialListRecord } from '../../Interfaces/IFinancialList';
import { DataService} from '../../data.service';
import { Observable } from 'rxjs';
import { FilterPipe } from '../../Pipes/filter.pipe';

@Component({
  selector: 'app-financial-list',
  templateUrl: './financial-list.component.html',
  styleUrls: ['./financial-list.component.less']
})
export class FinancialListComponent implements OnInit {
  @Input() financialList = new Array<FinancialListRecord>();
  @Input() financialListToPass = new Array<FinancialListRecord>();
  @Input() listType: string;
  @Input() color: string;
  @Input() searchField: string;

  constructor(private financialData: DataService) {
    
  }

  ngOnInit() {
  }

  deleteItem(name, description, value){
    let index = this.financialList.indexOf(
      this.financialListToPass.find(el => {
        return (el.description === description && el.value === value)
      })
    )
    console.log(index);
    this.financialList.splice(index, 1);
    this.financialData.updateList(this.financialList, name);
  }
}
