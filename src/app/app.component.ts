import {Component, OnInit} from '@angular/core';
import {StoryService} from './story.service';
import {IStoryOptions} from './interfaces/story';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    providers: [StoryService]
})
export class AppComponent implements OnInit {
    story: Object;
    storyText: string = '';
    storyOptions: IStoryOptions[] = [];

    constructor(private _storyService: StoryService) {

    }

    ngOnInit() {
        this._storyService.getStories().subscribe(res => {
            console.log(res);
            this.story = res;
            this.storyText = res[res['entry']].text;
            this.storyOptions = res[res['entry']].options;
        });
    }

    selectOption(val: string): void {
        this.storyText = this.story[val].text;
        this.storyOptions = this.story[val].options;
    }
}
