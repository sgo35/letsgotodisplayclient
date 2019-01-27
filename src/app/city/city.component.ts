import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { City, CityImpl } from '../interfaces/city.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { CityService } from '../city/services/city.service';
import { Page } from '../interfaces/page.interface';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  formGroup: FormGroup;
  filteredCities: Array<City>;
  isLoading = false;
  @Output()
  change: EventEmitter<City> = new EventEmitter<City>();

  constructor(private fb: FormBuilder, private cityService: CityService) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      'city': null
    });
    this.filteredCities = new Array<City>();
    this.isLoading = true;
    this.formGroup.controls.city.valueChanges
      .pipe(
        debounceTime(200),
        tap(() => this.isLoading = true),
        switchMap(value => {
          console.log('city.valueChanges', value);
          return this.cityService.getfindCityByName(<string>value, 'FR')
          .pipe(
            finalize(() => this.isLoading = false),
            )
            ;
        })
      )
      .subscribe((page: Page<City>) => {
          console.log('city.valueChanges result', this.filteredCities, page);
          this.filteredCities = page.content as City[];
      });

  }

  displayFn(city: City) {
    if (city) { return city.name + ' [' + city.country + ']'; }
  }


  update() {
    if (!this.isLoading) {
      let _city: City;
      if (this.formGroup.controls.city.value.id) {
        // City sélectionné
        _city = <City>this.formGroup.controls.city.value;
      } else {
        const query: string = <string>this.formGroup.controls.city.value;
        const name: string = query;
        _city = new CityImpl(name);
      }
      this.change.emit(_city);
      console.log('select city', _city);
    }

  }

}
