import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }  from './app.component';
import {TaskService} from './task.service';
import {AppRoutingModule} from './app-routing.module';
import {TasksComponent} from './tasks.component';

import {SprintsComponent} from './sprints.component';
import {SprintComponent} from './sprint.component';
import {DayComponent} from './day.component';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    JsonpModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  declarations: [ AppComponent, TasksComponent, SprintsComponent, SprintComponent, DayComponent],
  providers:    [ TaskService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
