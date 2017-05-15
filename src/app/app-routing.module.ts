import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksComponent }      from './tasks.component';
import {SprintsComponent} from './sprints.component';
import {SprintComponent} from './sprint.component';
import {DayComponent} from './day.component';

const routes: Routes = [
  { path: '', redirectTo: '/sprints', pathMatch: 'full' },
  // { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'tasks',     component: TasksComponent },
  { path: 'sprints',     component: SprintsComponent },
  { path: 'sprint/:id', component: SprintComponent },
  { path: 'day/:id', component: DayComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
