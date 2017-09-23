import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Location }               from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

import { Day }         from '../model/day';
import { DayService }  from '../service/day.service';
import {Task} from '../model/task';
import {TaskService} from '../service/task.service';

@Component({
  selector: 'day',
  templateUrl: './day.component.html',
  styleUrls: [ './day.component.css' ],
  providers: [DayService]
})
export class DayComponent implements OnInit {
  day: Day;

  constructor(
    private dayService: DayService,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.dayService.getDay(+params['id']))
      .subscribe(day => this.day = day);
  }

  onNewTaskKeyPressed(event: any) {
    if (event.charCode === 13) {
      this.addTask(event.srcElement.value);
      event.srcElement.value = '';
    }
  }

  addTask(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.dayService.createTask(this.day.id, name)
      .then(task => {
        let realTask = new Task(task);
        this.day.tasks.push(realTask);
      });
  }

  deleteTask(task: Task): void {
    this.dayService
      .deleteTask(task)
      .then(() => {
        this.day.tasks = this.day.tasks.filter(h => h !== task);
      });
  }

  completeTask(task: Task): void {
    task.finished = true;
    this.dayService.completeTask(task);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.dayService.update(this.day)
      .then(() => this.goBack());
  }

  refreshTasks(task: Task) {
    this.taskService.update(task).then(() => {
      this.day.tasks = this.day.tasks.filter(t => t.day_id === this.day.id);
    });
  }
}
