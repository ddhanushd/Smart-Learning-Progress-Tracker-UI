import { Routes } from '@angular/router';
import { TopicList } from './features/topics/topic-list/topic-list';
import { TopicCreate } from './features/topics/topic-create/topic-create';
import { TopicDetail } from './features/topics/topic-detail/topic-detail';
import { TopicStats } from './features/topics/topic-stats/topic-stats';
import { authGuard } from './core/guards/auth-guard';
import { Login } from './features/login/login';

export const routes: Routes = [
  { path: 'login', component: Login },
   { path: '', redirectTo: 'topics', pathMatch: 'full' },

  {
    path: 'topics',
    component: TopicList,
    canActivate: [authGuard]
  },
  {
    path: 'topics/create',
    component: TopicCreate,
    canActivate: [authGuard]
  },
  {
    path: 'topics/stats',
    component: TopicStats,
    canActivate: [authGuard]
  },
  {
    path: 'topics/:id',
    component: TopicDetail,
    canActivate: [authGuard]
  },

  // optional
  { path: '**', redirectTo: 'topics' }
];
