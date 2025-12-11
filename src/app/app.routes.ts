import { Routes } from '@angular/router';
import { TopicList } from './features/topics/topic-list/topic-list';
import { TopicCreate } from './features/topics/topic-create/topic-create';

export const routes: Routes = [
    { path: '', redirectTo: 'topics', pathMatch: 'full' },
  { path: 'topics', component: TopicList },
  { path: 'topics/create', component: TopicCreate }
];
