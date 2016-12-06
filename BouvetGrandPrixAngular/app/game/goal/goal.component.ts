
import { Component, Input} from '@angular/core';

@Component({
    selector: 'goal',
    templateUrl: 'app/game/goal/goal.component.html',
    styleUrls: [
        'app/game/goal/goal.component.css',
        'app/styles/shared.css'
    ]
})

export class GoalComponent {
    @Input() public completionTime: number;
    completionTime_string: string;


    ngOnChanges() {
        this.completionTime_string = this.TimeToString(this.completionTime);
    }

    public TimeToString(time: number): string {
        if (time === null || time < 0) {
            return "404, time not found";
        }
        let milliseconds_string = (Math.floor((time * 100 % 100))).toString();
        if (milliseconds_string.length === 1) milliseconds_string = "0" + milliseconds_string;

        let seconds_string = (Math.floor((time % 60))).toString();
        if (seconds_string.length === 1) seconds_string = "0" + seconds_string;

        let minute_string = (Math.floor((time / 60))).toString();
        if (minute_string.length === 1) minute_string = "0" + minute_string;

        return minute_string + "." + seconds_string + "." + milliseconds_string;
    }
}