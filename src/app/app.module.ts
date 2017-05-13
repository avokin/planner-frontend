import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {TaskService} from './task.service';
import {AppRoutingModule} from './app-routing.module';
import {TasksComponent} from './tasks.component';
import {HttpModule, JsonpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {SprintsComponent} from './sprints.component';
import {SprintComponent} from './sprint.component';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule
  ],
  declarations: [ AppComponent, TasksComponent, SprintsComponent, SprintComponent ],
  providers:    [ TaskService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
