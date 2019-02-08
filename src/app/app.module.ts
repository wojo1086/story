import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BuilderComponent} from './builder/builder.component';
import {StoryComponent} from './story/story.component';

import {
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
} from '@angular/material';
import { OptionsDialogComponent } from './dialogs/options-dialog/options-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        BuilderComponent,
        StoryComponent,
        OptionsDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MatBadgeModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ],
    entryComponents: [OptionsDialogComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
