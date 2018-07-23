import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from "@angular/material";
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DataService } from '../../data.service';

@Component({
    selector: 'editing',
    templateUrl: './editing.component.html',
    styleUrls: ['./editing.component.less']
})
export class EditingComponent implements OnInit {

    form: FormGroup;
    currencyArray: string[];

    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<EditingComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private financialData: DataService)
    {
      this.currencyArray = this.financialData.currencyArray;
    }

    ngOnInit() {
      console.log(this.data);
        this.form = this.fb.group({
            description: this.data.description,
            value: this.data.value,
            currency: this.data.currency
        });
    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }
}
