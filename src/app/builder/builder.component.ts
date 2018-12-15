import {Component, OnInit} from '@angular/core';
import {S3Service} from '../services/s3.service';

@Component({
    selector: 'app-builder',
    templateUrl: './builder.component.html',
    styleUrls: ['./builder.component.sass']
})
export class BuilderComponent implements OnInit {
    entry: string = '';
    story = {};
    entryOptions: string[] = [];

    constructor(private _s3Service: S3Service) {

    }

    ngOnInit() {
        this.getJson();
    }

    saveJson(): void {
        console.log(this.story);
        this.story['entry'] = this.entry;
        this._s3Service.uploadJson(this.story);
    }

    getJson(): void {
        this._s3Service.loadStories().then(res => {
            this.entry = res.entry;
            delete res.entry;
            this.story = JSON.parse(JSON.stringify(res));
        });
    }

    editEntry(key): void {
        this.story[key].editing = true;
        this.story[key].optionsEdit = this.story[key].options;
    }

    deleteEntry(opt): void {
        delete this.story[opt];
    }

    saveEntry(key): void {
        this.story[key].editing = false;
    }

}
