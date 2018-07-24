import { Component, OnInit, Input } from '@angular/core';
import { FinancialListRecord } from '../../Interfaces/IFinancialList';
import { DataService} from '../../data.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { EditingComponent } from '../../modalWindows/editing/editing.component';
import { DeleteModalComponent } from '../../modalWindows/delete-modal/delete-modal.component';
import { Observable } from 'rxjs';

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

  constructor(private financialData: DataService, private dialog: MatDialog) {
    
  }

  ngOnInit() {
  }

  findItemIndex(description, value) : number{
    let index = this.financialList.indexOf(
      this.financialListToPass.find(el => {
        return (el.description === description && el.value === value)
      })
    )
    return index;
  }

  deleteItem(name, description, value, currency){
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '80%',
      height: 'auto',
      data: {
        description: description,
        value: value,
        currency: currency
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)
        if(data != undefined){
          let index = this.findItemIndex(description, value);
          this.financialList.splice(index, 1);
          this.financialData.updateList(this.financialList, name);
        }
      }
    );
  }

  editItem(description, value, currency, listType){
    const dialogRef = this.dialog.open(EditingComponent, {
      width: '80%',
      height: 'auto',
      data: {
        description: description,
        value: value,
        currency: currency
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)
        if(data != undefined){
          let index = this.findItemIndex(description, value);
          this.financialList[index].description = data.description;
          this.financialList[index].currency = data.currency;
          this.financialList[index].value = parseInt(data.value);
          this.financialData.updateList(this.financialList, listType);
        }
      }
    );    
  }
}
