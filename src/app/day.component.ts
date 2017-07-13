import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Location }               from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

import { Day }         from './day';
import { DayService }  from './day.service';
import {Task} from './task';
import {TaskService} from './task.service';

@Component({
  selector: 'day',
  templateUrl: './day.component.html',
  styleUrls: [ './day.component.css' ],
  providers: [DayService]
})
export class DayComponent implements OnInit {
  day: Day;

  constructor(
    private router: Router,
    private dayService: DayService,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.dayService.getDay(+params['id']))
      .subscribe(day => this.day = day);
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
    console.log('updateTaskDueDate: ' + task.day_id);
    this.taskService.update(task).then(() => {
      console.log('Callback: ' + task.day_id);
      this.day.tasks = this.day.tasks.filter(t => t.day_id === this.day.id);
    });
  }

  gotoSprint() {
    this.router.navigate(['/sprint', this.day.sprint_id]);
    event.preventDefault();
  }

  getCalendarUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://calendar.google.com/calendar/embed?showTitle=0&showNav=0&showDate=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0&mode=DAY&wkst=1&bgcolor=%23FFFFFF&src=andrey.vokin%40gmail.com&color=%231B887A&ctz=Europe%2FBerlin&dates=${this.day.id}/${this.day.id}`);
  }
}
