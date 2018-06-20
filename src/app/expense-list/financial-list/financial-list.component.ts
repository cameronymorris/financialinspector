import { Component, OnInit, Input } from '@angular/core';
import { FinancialListRecord } from '../../Interfaces/IFinancialList';
import { DataService} from '../../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-financial-list',
  templateUrl: './financial-list.component.html',
  styleUrls: ['./financial-list.component.less']
})
export class FinancialListComponent implements OnInit {

  @Input() financialList = new Array<FinancialListRecord>();
  @Input() listType: string;
  @Input() color: string;

  constructor(private financialData: DataService) {
    
  }

  ngOnInit() {
  }

  deleteItem(index, name){
    this.financialList.splice(index, 1);
    this.financialData.updateList(this.financialList, name);
  }
}
