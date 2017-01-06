import { Injectable } from '@angular/core';
import { Record } from './record';
import { TOPLIST } from './mockData_toplist';


import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ToplistService {
    private serverUrl = 'app/services/records.json';
    constructor(private http: Http) { }

    getToplist(): Observable<Record[]> {
        return this.http.get(this.serverUrl) // ...using get request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error, could not load record')); //...errors if any
    }

    saveRecord(newRecord: Record): void {
        let bodyString = JSON.stringify(newRecord); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        this.http.post(this.serverUrl, bodyString, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error, could not save record')); //...errors if any
    } 

}