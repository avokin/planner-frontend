import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';

import { AppComponent }  from './component/app.component';
import {TaskService} from './service/task.service';
import {AppRoutingModule} from './app-routing.module';
import {TasksComponent} from './component/tasks.component';

import {SprintsComponent} from './component/sprints.component';
import {SprintComponent} from './component/sprint.component';
import {DayComponent} from './component/day.component';
import {DayMenuComponent} from './component/day-menu.component';
import {CalendarComponent} from './component/calendar.component';
import {MenuComponent} from './component/menu.component';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    JsonpModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    RouterModule
  ],
  declarations: [ AppComponent, TasksComponent, SprintsComponent, SprintComponent, DayComponent, DayMenuComponent,
    CalendarComponent, MenuComponent],
  providers:    [ TaskService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
