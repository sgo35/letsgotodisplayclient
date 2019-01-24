import { Injectable } from '@angular/core';


@Injectable()
export class UtilService {
    // http://xxx:yyy/engine/zzz/1234/aaaa{?pppp}, {bbb='z', ccc='y'} => // /zzz/1234/aaaa?bbb=z&ccc=y}
    sanitizeRestUrl(baseUrl: string, url: string, param?: any) {
        let finalUrl = url.substring(baseUrl.length);
        if (finalUrl.indexOf('{') > -1) {
            finalUrl = finalUrl.substring(0, finalUrl.indexOf('{'));
        }
        if (param) {
            for (const key of Object.keys(param)) {
                if (typeof (param[key]) === 'object' && param[key].length && param[key].length > 1) {
                    for (const p of (param[key])) {
                        finalUrl = finalUrl + (finalUrl.indexOf('?') === -1 ? '?' : '&') + key + '=' + p;
                    }
                } else {
                    finalUrl = finalUrl + (finalUrl.indexOf('?') === -1 ? '?' : '&') + key + '=' + param[key];
                }
            }
        }
        // console.log('sanitizeRestUrl', finalUrl);
        return finalUrl;
    }

    /**
    * Transforme un objet Date en date lisible.
    * @param date Date
    */
    convertDatetoPrettyString(
        date: Date | number
        , options: { onlyTime?: boolean, withTime?: boolean, dateSeparator?: string, timeSeparator?: string, yearFirst?: boolean }
    ) {
        if (typeof date === 'number') {
            const epoch: number = date;
            date = new Date(0);
            date.setUTCSeconds(epoch);
            console.log('toPrettyString date', date);
        }
        if (!options.dateSeparator) {
            options.dateSeparator = '/';
        }
        if (!options.timeSeparator) {
            options.timeSeparator = ':';
        }
        let datePart = '';
        if (!options.onlyTime) {
            if (options.yearFirst) {
                datePart += date.getFullYear() + options.dateSeparator
                    + ((date.getMonth() + 1) < 10 ? '0' : '')
                    + (date.getMonth() + 1) + options.dateSeparator
                    + (date.getDate() < 10 ? '0' : '')
                    + date.getDate();
            } else {
                datePart = (date.getDate() < 10 ? '0' : '')
                    + date.getDate() + options.dateSeparator
                    + ((date.getMonth() + 1) < 10 ? '0' : '')
                    + (date.getMonth() + 1) + options.dateSeparator
                    + date.getFullYear();
            }
        }

        let timePart = '';
        if (options.onlyTime || options.withTime) {
            timePart = (datePart ? ' \u00e0 ' : '') + (date.getHours() < 10 ? '0' : '')
                + date.getHours() + options.timeSeparator
                + (date.getMinutes() < 10 ? '0' : '')
                + date.getMinutes() + options.timeSeparator
                + (date.getSeconds() < 10 ? '0' : '')
                + date.getSeconds();
        }

        return datePart + timePart;
    }

}
