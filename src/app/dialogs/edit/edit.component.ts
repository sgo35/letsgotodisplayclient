import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ModeEnum } from './mode.enum';
import { City, CityImpl } from 'src/app/weather/interfaces/city.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  mode: ModeEnum;
  modeEnum = ModeEnum;

  city: City;
  // formGroup: FormGroup;
  loading = true;

  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.mode = this.data.mode as ModeEnum;
    if (this.data && this.data.params['city']) {
      if (this.data.params['city'].id) {
        this.city = this.data.params.city;
      } else {
        this.city = new CityImpl(this.data.params.city);
      }
    }
    // this.formGroup = this.formBuilder.group({
    //   city: new FormControl(this.data && this.data.param s&& this.data.param.scity ? this.data.param.scity : undefined)
    // });
    this.loading = false;
    console.log('EditComponent init', this.data);
  }

  // getErrorMessage() {
  //   return this.formControl.hasError('required') ? 'Valeur obligatoire' :
  //     this.formControl.hasError('filter') ? 'L\'expression n\'est pas valide' :
  //       '';
  // }

  close(data?: any): void {
    this.dialogRef.close(data);
  }

  cityChanged(event: City) {
    if (this.data && this.data.params) {
      this.data.params['city'] = event;
      console.log('cityChanged', event);
    } else {
      console.error('cityChanged no Param city', event);
    }
  }

  submit() {
    // const _param: any = (
    //   this.formGroup.controls.city.value as City
    // );
    switch (+this.mode) {
      case ModeEnum.UPDATE:
        console.log('submit UPDATE', this.data.params);
        // this.widgetService.updateParam(_param);
        break;
      case ModeEnum.CREATE:
        console.log('submit ADD', this.data.params);
        // this.widgetService.addParam(_param);
        break;

      default:
        console.error('submit error mode not found', this.mode);
        break;
    }
    this.close(this.data);
  }

  isValid() {
    // return this.formGroup.controls.attribute.value && this.formGroup.controls.operator.value && this.formGroup.controls.value.value;
    return this.data && this.data.params && this.data.params['city'];
  }
}
