import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ModeEnum } from './mode.enum';
import { City } from 'src/app/weather/interfaces/city.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  mode: ModeEnum;
  modeEnum = ModeEnum;

  @Input() city: City;
  formGroup: FormGroup;
  loading = true;

  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.mode = this.data.mode as ModeEnum;
    this.formGroup = this.formBuilder.group({
      city: new FormControl(this.city ? this.city : undefined)
    });
    this.loading = false;
  }

  // getErrorMessage() {
  //   return this.formControl.hasError('required') ? 'Valeur obligatoire' :
  //     this.formControl.hasError('filter') ? 'L\'expression n\'est pas valide' :
  //       '';
  // }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cityChanged(event: City) {
    console.log('cityChanged', event);
    this.city = event;
  }

  submit() {
    const _param: any = (
      this.formGroup.controls.city.value as City
    );
    switch (+this.mode) {
      case ModeEnum.UPDATE:
        console.log('submit UPDATE', _param);
        // this.widgetService.updateParam(_param);
        break;
      case ModeEnum.CREATE:
        console.log('submit ADD', _param);
        // this.widgetService.addParam(_param);
        break;

      default:
        console.error('submit error mode not found', this.mode);
        break;
    }
  }

  isValid() {
    // return this.formGroup.controls.attribute.value && this.formGroup.controls.operator.value && this.formGroup.controls.value.value;
    return this.formGroup.controls.city.value;
  }
}
