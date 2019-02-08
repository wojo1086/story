import {Component, OnInit} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {S3Service} from '../services/s3.service';
import {IStory, IStoryOptions} from '../interfaces/story';
import {MatDialog} from '@angular/material';
import {OptionsDialogComponent} from '../dialogs/options-dialog/options-dialog.component';

@Component({
    selector: 'app-builder',
    templateUrl: './builder.component.html',
    styleUrls: ['./builder.component.sass']
})
export class BuilderComponent implements OnInit {
    entry: string = '';
    story = [];
    entryOptions: string[] = [];
    entryEdit = {
        point: '',
        text: '',
        options: []
    };
    uneditedEntryEdit;
    editing: boolean = false;
    storyEditForm: FormGroup;
    optionsEdit: FormArray;

    constructor(private _s3Service: S3Service,
                private _dialog: MatDialog,
                private _fb: FormBuilder) {

    }

    ngOnInit() {
        this.createForm();
        this.getJson();
    }

    createForm(): void {
        this.storyEditForm = this._fb.group({
            point: '',
            text: '',
            options: this._fb.array([this.createOption()])
        });
    }

    createOption(opt = {text: '', value: ''}): FormGroup {
        return this._fb.group({
            text: opt.text,
            value: opt.value
        });
    }

    saveJson(): void {
        const storySave = {};
        this.story.forEach(st => {
            storySave[st.point] = {
                text: st.text,
                options: st.options
            };
        });
        storySave['entry'] = this.entry;
        const story = JSON.parse(JSON.stringify(storySave));
        this._s3Service.uploadJson(story).subscribe(res => {
            this.getJson();
        });
    }

    getJson(): void {
        this._s3Service.loadStories().subscribe(res => {
            this.story = [];
            console.log(res);
            this.entry = res.entry;
            delete res.entry;
            this.entryOptions = Object.keys(res);
            Object.keys(res).forEach(key => {
                this.story.push({
                    point: key,
                    text: res[key].text,
                    options: res[key].options
                });
            });
        });
    }

    editEntry(obj): void {
        console.log(obj);
        this.editing = true;
        this.uneditedEntryEdit = obj;
        this.storyEditForm.reset();
        this.entryEdit = JSON.parse(JSON.stringify(obj));
        const opts = <FormArray>this.storyEditForm.get('options');
        while (opts.length) {
            opts.removeAt(0);
        }

        this.storyEditForm.patchValue(this.entryEdit);
        this.entryEdit.options.forEach(opt => {
            opts.push(this.createOption(opt));
        });
    }

    deleteEntry(): void {
        this.story.splice(this.story.indexOf(this.uneditedEntryEdit), 1);
        this.clearEdit();
    }

    saveEdit(): void {
        if (this.editing) {
            this.uneditedEntryEdit.point = this.storyEditForm.get('point').value;
            this.uneditedEntryEdit.text = this.storyEditForm.get('text').value;
            this.uneditedEntryEdit.options = this.storyEditForm.get('options').value;
        } else {
            this.story.push({
                point: this.storyEditForm.get('point').value,
                text: this.storyEditForm.get('text').value,
                options: this.storyEditForm.get('options').value
            });
        }
        this.clearEdit();
    }

    newOption(): void {
        this.optionsEdit = <FormArray>this.storyEditForm.get('options');
        this.optionsEdit.push(this.createOption());
    }

    clearEdit(): void {
        this.storyEditForm.reset();
        this.createForm();
        this.editing = false;
    }

    showOptions(opt): void {
        this._dialog.open(OptionsDialogComponent, {
            width: '800px',
            data: {options: opt}
        });
    }
}
