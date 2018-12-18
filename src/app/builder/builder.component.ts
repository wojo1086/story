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
    tim;
    entryOptions: string[] = [];

    constructor(private _s3Service: S3Service) {

    }

    ngOnInit() {
        this.getJson();
    }

    saveJson(): void {
        const story = JSON.parse(JSON.stringify(this.story));
        story['entry'] = this.entry;
        this._s3Service.uploadJson(story).subscribe(res => {
            this.getJson();
        });
    }

    getJson(): void {
        this._s3Service.loadStories().subscribe(res => {
            console.log(res);
            this.entry = res.entry;
            delete res.entry;
            this.entryOptions = Object.keys(res);
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
        this.story[key].options = this.story[key].optionsEdit;
        delete this.story[key].optionsEdit;
        this.story[key].editing = false;
    }

    newOption(key): void {
        this.story[key].options.unshift({text: '', value: ''});
    }

}
