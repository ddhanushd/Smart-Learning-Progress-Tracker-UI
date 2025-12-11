import { Routes } from '@angular/router';
import { TopicList } from './features/topics/topic-list/topic-list';

export const routes: Routes = [
    { path: '', redirectTo: 'topics', pathMatch: 'full' },
    { path: 'topics', component: TopicList },
];
