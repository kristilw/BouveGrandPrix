
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
    @Output() restartGame_eventEmitter: EventEmitter<void> = new EventEmitter<void>();


    constructor(
        private toplistService: ToplistService
    ) {}

    registerRecord(): void {
        let roundCompletionTime = this.completionTime - this.completionTime % 1;
        if (this.completionTime !== null && this.user_name.length > 2 && this.user_email.length > 5) {
            let newRecord = new Record(this.completionTime, this.user_name, this.user_email, this.user_company);
            console.log("newRecord: inside goal.component ",newRecord);
            this.toplistService.saveRecord(newRecord);
            this.saveRecord_eventEmitter.emit();
        }
        else
        {
            console.log("Error with inputs");
        }

        // test         //bodyString = "action=setScore&name=kindasuccess3&email=kindasuccess3%40test.com&time=123458&score=123458";
        //let newRecord = new Record(155113, "success123", "kindasuccess123@test.com", "Bouvet AS");
        //this.toplistService.saveRecord(newRecord);
    }

    restartGame(): void {
        this.restartGame_eventEmitter.emit();
    }

    nameChange(value: string) { this.user_name = value; }
    emailChange(value: string) { this.user_email = value; }
    companyChange(value: string) { this.user_company = value; }
}