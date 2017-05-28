import {Component, OnInit} from '@angular/core';

import {Sprint} from './sprint';
import { SprintService } from './sprint.service';
import {Router} from '@angular/router';


@Component({
  selector: 'my-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.css'],
  providers: [SprintService]
})
export class SprintsComponent implements OnInit {
  sprints: Sprint[];
  constructor(
    private router: Router,
    private sprintService: SprintService) { }
  getSprints(): void {
    this.sprintService.getSprints().then(sprints => this.sprints = sprints);
  }
  ngOnInit(): void {
    this.getSprints();
  }
  gotoDetail(sprint: Sprint): void {
    this.router.navigate(['/sprint', sprint.id]);
  }
  add(from: number, to: number): void {
    if (!from) { return; }
    if (!to) { return; }
    this.sprintService.create(from, to)
      .then(sprint => {
        this.sprints.push(sprint);
      });
  }
  delete(sprint: Sprint): void {
    this.sprintService
      .delete(sprint.id)
      .then(() => {
        this.sprints = this.sprints.filter(h => h !== sprint);
      });
  }
}
