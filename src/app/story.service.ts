import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import * as story from '../assets/json/stories/story-one.json';
// let storyOne = require('stories/story-one.json');

@Injectable()
export class StoryService {

    constructor(private _http: HttpClient) {
        // console.log(story);
    }

    getStories() {
        return this._http.get('../assets/json/stories/story-one.json');
    }

}
