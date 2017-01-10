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
    private serverUrl = 'app/server/server.php';
    constructor(private http: Http) { }

    getToplist(): Observable<Record[]> {

        let bodyString = JSON.stringify({action: 'getScores'}); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option


        return this.http.post(this.serverUrl,bodyString, options) // ...using get request
            .map((res: Response) => console.log(res.json())) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(console.log(error) || 'Server error, could not load record')); //...errors if any
    }

    saveRecord(newRecord: Record): void {

        let bodyString = JSON.stringify({action: 'setScore',name:newRecord.name,email:newRecord.email,time:newRecord.time,score:newRecord.time}); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        console.log("setScore call :=> ||  ",bodyString);

        this.http.post(this.serverUrl, bodyString, options) // ...using post request
            .map((res: Response) => {

                let body;

                console.log("extract data: ",res);
                // check if empty, before call json
                if (res.text()) {
                    body = res.json();
                }

                return body || {};

            }) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error, could not save record')); //...errors if any
    }

}