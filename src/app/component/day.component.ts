import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

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
  overdueTasks: Task[];
  day: Day;

  constructor(
    private dayService: DayService,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  getAllTasks(): Task[] {
    if (this.day == null && this.overdueTasks == null) {
      return [];
    }
    if (this.day == null) {
      return this.overdueTasks;
    }
    if (this.overdueTasks == null) {
      return this.day.tasks;
    }
    return this.overdueTasks.concat(this.day.tasks)
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.dayService.getDay(+params['id']))
      .subscribe(day => this.day = day);

    this.route.params
      .switchMap((params: Params) => this.taskService.getOverdueTasks(+params['id']))
      .subscribe(overdueTasks => {
        if (overdueTasks != null) {
          this.overdueTasks = overdueTasks;
        }
      });
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
