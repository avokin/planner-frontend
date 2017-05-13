import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksComponent }      from './tasks.component';
import {SprintsComponent} from './sprints.component';
import {SprintComponent} from './sprint.component';

const routes: Routes = [
  { path: '', redirectTo: '/sprints', pathMatch: 'full' },
  // { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'tasks',     component: TasksComponent },
  { path: 'sprints',     component: SprintsComponent },
  { path: 'sprint/:id', component: SprintComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
