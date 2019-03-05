import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { City, CityImpl } from '../interfaces/city.interface';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { CityService } from '../city/services/city.service';
import { Page } from '../../interfaces/page.interface';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit, AfterViewInit {

  formGroup: FormGroup;
  filteredCities: Array<City>;
  isLoading = false;
  _city: City;
  @Input() set city(_city: City) { this._city = _city; }
  get city() { return this._city; }

  @Output()
  change: EventEmitter<City> = new EventEmitter<City>();

  constructor(private fb: FormBuilder, private cityService: CityService) { }

  ngOnInit() {
    console.log('city', this.city);
    this.formGroup = this.fb.group({
      'city': new FormControl(this.city ? this.city : undefined)
    });
    this.filteredCities = new Array<City>();
    if (this.city) {
      if (!this.city.country) {
        this.city.country = 'FR';
      }
      this.filteredCities.push(this.city);
    }
  }

  ngAfterViewInit() {
  }

  onFocus() {
    this.formGroup.controls['city'].valueChanges
      .pipe(
        debounceTime(200),
        tap(() => this.isLoading = true),
        switchMap(value => {
          console.log('value change', value);
          return this.cityService.getfindCityByName(value, 'FR')
            .pipe(
              finalize(() => {
                this.isLoading = false;
                if (value && value.id) {
                  console.log('city selected', value);
                  this.update(value);
                }
              }),
            )
            ;
        })
      )
      .subscribe((page: Page<City>) => {
        console.log('city.valueChanges loaded autocomplete', this.filteredCities, page);
        this.filteredCities = page.content as City[];
      });
  }

  displayFn(city: City) {
    if (city) { return city.name + ' [' + city.country + ']'; }
  }


  update(_city: City) {
    if (!this.isLoading) {
      // let _city: City;
      // if (this.formGroup.controls.city.value.id) {
      //   // City sélectionné
      //   _city = <City>this.formGroup.controls.city.value;
      // } else {
      //   const query: string = <string>this.formGroup.controls.city.value;
      //   const name: string = query;
      //   _city = new CityImpl(name);
      // }
      console.log('City selected', _city);
      this.change.emit(_city);
    }

  }

}
