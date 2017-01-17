
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ToplistService } from '../../services/toplist.service';
import { Record } from '../../services/record';

@Component({
    selector: 'goal',
    templateUrl: 'app/game/goal/goal.component.html',
    styleUrls: [
        'app/game/goal/goal.component.css',
    ]
})

export class GoalComponent {
    user_name: string = "";
    user_email: string = "";
    user_company: string = "";

    @Input() public completionTime: number;

    @Output() saveRecord_eventEmitter: EventEmitter<void> = new EventEmitter<void>();
    @Output() goToAboutPage_eventEmitter: EventEmitter<void> = new EventEmitter<void>();


    constructor(
        private toplistService: ToplistService
    ) {}

    registerRecord(): void {

        if (this.completionTime !== null && this.user_name.length > 2 && this.user_email.length>5) {

            debugger;
            let newRecord = new Record(this.completionTime, this.user_name, this.user_email, this.user_company);
            console.log("newRecord: inside goal.component ",newRecord);
            this.toplistService.saveRecord(newRecord);
            //this.saveRecord_eventEmitter.emit();
        }
        else
        {

            console.log("Error with inputs");
        }

        // test
        /*let newRecord = new Record(123546, "Ole", "Ole@test.com", "Bouvet AS");
        this.toplistService.saveRecord(newRecord);
        this.saveRecord_eventEmitter.emit();
        */
    }

    goToAboutPage(): void {
        this.goToAboutPage_eventEmitter.emit();
    }

    nameChange(value: string) { this.user_name = value; }
    emailChange(value: string) { this.user_email = value; }
    companyChange(value: string) { this.user_company = value; }
}