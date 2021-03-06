﻿import { Injectable, EventEmitter } from '@angular/core';
import { Record } from './record';
import { ViewRecord } from './viewRecord';
import { TOPLIST } from './mockData_toplist';


import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ToplistService {
    private serverUrl = '/app/server/server.php';// 'http://localhost/server.php'; //  

    constructor(private http: Http) { }

    // To Test / Debug locally
    /*getToplist(): Observable<ViewRecord[]> {

        return this.http.get('/app/server/dummydata.json')
            .map((res: Response)=>{
                var output = res.json();
                return output;
            }) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(console.log(error) || 'Server error, could not load record'));
    }*/

    getToplist(): Observable<ViewRecord[]> {
        let bodyString = 'action=getScores';
        let headers      = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options       = new RequestOptions({ headers: headers });

        return this.http.post(this.serverUrl, bodyString, options)
            .map((res: Response)=>{
                var output = res.json();
                return output;
            })
            .catch((error: any) => Observable.throw(console.log(error) || 'Server error, could not load record'));
    }



    saveRecord(newRecord: Record, event: EventEmitter<number>): Promise<any> {
        let bodyString = "action=setScore"
            + "&name=" + newRecord.name.trim()
            + "&email=" + newRecord.email.trim()
            + "&time=" + newRecord.time
            + "&score=" + newRecord.time;

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            this.http.post(this.serverUrl, bodyString, options)
                .toPromise()
                .then(res => {
                    var output = res.json();
                    resolve({ 'position': output.position, 'event':event});
                })
                .catch((error: any) => Observable.throw(console.log(error) || 'Server error, could not load record'));
        })
    }

}