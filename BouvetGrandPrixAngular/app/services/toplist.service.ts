import { Injectable } from '@angular/core';
import { Record } from './record';
import { TOPLIST } from './mockData_toplist';

@Injectable()
export class ToplistService {
    getToplist(): Promise<Record[]> {
        console.log("get top list");
        return Promise.resolve(TOPLIST);
    }

    getToplistSlow(): Promise<Record[]> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.getToplist()),2000);
        });
    }
}