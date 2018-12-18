import {Component, OnInit} from '@angular/core';
import {IStoryOptions} from '../interfaces/story';
import {S3Service} from '../services/s3.service';

@Component({
    selector: 'app-story',
    templateUrl: './story.component.html',
    styleUrls: ['./story.component.sass']
})
export class StoryComponent implements OnInit {
    story: Object;
    storyText: string = '';
    storyOptions: IStoryOptions[] = [];

    constructor(private _s3Service: S3Service) {

    }

    ngOnInit() {
        this._s3Service.loadStories().subscribe(res => {
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
