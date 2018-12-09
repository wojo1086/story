import {Component, OnInit} from '@angular/core';
import {StoryService} from './story.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    providers: [StoryService]
})
export class AppComponent implements OnInit {
    story: Object;

    constructor(private _storyService: StoryService) {

    }

    ngOnInit() {
        this._storyService.getStories().subscribe(res => {
            console.log(res);
            this.story = res;
        });
    }
}
