import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from "@angular/material";
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.less']
})
export class DeleteModalComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<DeleteModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private financialData: DataService) { }

  ngOnInit() {
    this.form = this.fb.group({
      description: this.data.description,
      value: this.data.value,
      currency: this.data.currency
    });
  }

  delete() {
    this.dialogRef.close(this.form.value);
  }

  cancel() {
      this.dialogRef.close();
  }
}
