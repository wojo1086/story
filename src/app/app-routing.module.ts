import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BuilderComponent} from './builder/builder.component';
import {StoryComponent} from './story/story.component';

const routes: Routes = [
    {path: '', component: StoryComponent},
    {path: 'builder', component: BuilderComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
