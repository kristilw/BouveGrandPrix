
import { Component, Input, Output, EventEmitter} from '@angular/core';

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

    @Output() saveRecord_eventEmitter: EventEmitter<void> = new EventEmitter<void>();
    @Output() goToAboutPage_eventEmitter: EventEmitter<void> = new EventEmitter<void>();


    registerRecord(): void {
        this.saveRecord_eventEmitter.emit();
    }

    goToAboutPage(): void {
        this.goToAboutPage_eventEmitter.emit();
    }
}