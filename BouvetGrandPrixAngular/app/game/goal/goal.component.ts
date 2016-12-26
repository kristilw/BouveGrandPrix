
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
}