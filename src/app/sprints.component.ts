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
  selectedSprint: Sprint;
  constructor(
    private router: Router,
    private sprintService: SprintService) { }
  getSprints(): void {
    this.sprintService.getSprints().then(sprints => this.sprints = sprints);
  }
  ngOnInit(): void {
    this.getSprints();
  }
  onSelect(sprint: Sprint): void {
    this.selectedSprint = sprint;
  }
  gotoDetail(): void {
    this.router.navigate(['/sprint', this.selectedSprint.id]);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.sprintService.create(name)
      .then(sprint => {
        this.sprints.push(sprint);
        this.selectedSprint = null;
      });
  }
  delete(sprint: Sprint): void {
    this.sprintService
      .delete(sprint.id)
      .then(() => {
        this.sprints = this.sprints.filter(h => h !== sprint);
        if (this.selectedSprint === sprint) { this.selectedSprint = null; }
      });
  }
}
