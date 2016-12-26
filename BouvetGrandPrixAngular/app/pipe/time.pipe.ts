import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'recordTime'
})
export class TimePipe implements PipeTransform {

    transform(value: number, args: string[]): string {
        if (value === null || value < 0) {
            return "404, time not found";
        }

        console.log(args[0])
        if (args[0] === 'm') { //from milliseconds
            value /= 1000;
        }

        let milliseconds_string = (Math.floor((value * 100 % 100))).toString();
        if (milliseconds_string.length === 1) milliseconds_string = "0" + milliseconds_string;

        let seconds_string = (Math.floor((value % 60))).toString();
        if (seconds_string.length === 1) seconds_string = "0" + seconds_string;

        let minute_string = (Math.floor((value / 60))).toString();
        if (minute_string.length === 1) minute_string = "0" + minute_string;

        return minute_string + "." + seconds_string + "." + milliseconds_string;
    }
}
