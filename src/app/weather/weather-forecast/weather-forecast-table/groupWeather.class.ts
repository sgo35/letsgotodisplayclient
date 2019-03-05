import { BehaviorSubject } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { WeatherService } from '../../services/weather.service';
import { WeatherDayEnum } from './weatherDayEnum.enum';

export interface Column {
    columnDef: string;
    header: any;
    cell: any[];
}

export class TableDataSource extends DataSource<any> {
    constructor(private _data: BehaviorSubject<any[]>) {
        super();
    }
    connect() {
        return this._data.asObservable();
    }
    disconnect() { }
}

export class GroupWeather {
    entityColumns: { [key: number]: Array<string> };
    entityRows: { [key: number]: Array<any> };
    keys: Array<string>;
    dataSource: TableDataSource;
    dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    displayedColumns: string[];
    columns: Column[];
    constructor(list: any[]) {
        this.dataSource = new TableDataSource(this.dataSubject);
        // init
        this.entityColumns = [];
        this.entityRows = [];
        this.keys = [];
        let key = 0;

        // title
        this.entityColumns[0] = ['title'];
        this.entityRows[0] = Object.keys(WeatherDayEnum).filter(k => typeof WeatherDayEnum[k as any] === 'number');
        // WeatherList[]
        let dayOld: Date;
        list.forEach((e, eIdx, array) => {
            // console.log('generateTable key entityRows', e, { ...dayOld }, key, { ... this.entityColumns }, { ... this.entityRows[key] });
            if (eIdx === 0 || WeatherService.compareDay(dayOld, +e.dt) !== 0) {
                key++;
                if (!this.entityRows[key]) {
                    dayOld = WeatherService.getDateTime(+e.dt);
                    dayOld.setHours(0, 0, 0, 0);
                    this.entityRows[key] = [];
                    this.entityColumns[key] = [];
                    const options = { weekday: 'long' };
                    this.keys.push(new Intl.DateTimeFormat('fr-FR', options).format(dayOld));
                    // console.log('generateTable dayOld', dayOld, key, this.keys, { ... this.entityColumns });
                }
            }
            this.entityColumns[key].push('day' + eIdx);
            this.entityRows[key].push(e);
        });
        // console.log('generateTable this.entityRows', this.entityRows);
        // this.entityRows = [...list];

    }


}
