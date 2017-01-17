import { Injectable } from '@angular/core';
import { Record } from './record';


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

        //let bodyString = JSON.stringify({action: 'getScores'}); // Stringify payload
        let bodyString = 'action=getScores';
        let headers      = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.serverUrl,bodyString, options) // ...using get request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(console.log(error) || 'Server error, could not load record')); //...errors if any*/

        /*return this.http.get("http://localhost:3000/app/services/records.json")
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));//*/
    }

    saveRecord(newRecord: Record): void {


        //let bodyString = JSON.stringify({action: 'setScore',name:newRecord.name,email:newRecord.email,time:newRecord.time,score:newRecord.time}); // Stringify payload
        let bodyString = "action=setScore"
            +"&name="+newRecord.name
            +"&email="+newRecord.email
            +"&time="+newRecord.time
            +"&score="+newRecord.time;

        let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });

        debugger;
        this.http.post(this.serverUrl,bodyString, options) // ...using get request
            .map((res: Response) => {console.log(res.json())}) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(console.log(error) || 'Server error, could not load record')); //...errors if any
    }

}