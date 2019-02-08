import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-options-dialog',
    templateUrl: './options-dialog.component.html',
    styleUrls: ['./options-dialog.component.sass']
})
export class OptionsDialogComponent implements OnInit {
    options = [];

    constructor(@Inject(MAT_DIALOG_DATA) public data) {
        this.options = data.options;
    }

    ngOnInit() {
    }

}
