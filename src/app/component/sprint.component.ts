import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Location }               from '@angular/common';

import { Day }            from '../model/day';
import { Sprint }         from '../model/sprint';
import { SprintService }  from '../service/sprint.service';
import {Goal} from '../model/goal';

@Component({
  selector: 'sprint',
  templateUrl: './sprint.component.html',
  styleUrls: [ './sprint.component.css' ],
  providers: [SprintService]
})
export class SprintComponent implements OnInit {
  sprint: Sprint;

  constructor(
    private router: Router,
    private sprintService: SprintService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.sprintService.getSprint(+params['id']))
      .subscribe(sprint => this.sprint = sprint);
  }

  addGoal(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.sprintService.createGoal(this.sprint.id, name)
      .then(goal => {
        this.sprint.goals.push(goal);
      });
  }

  gotoDay(day: Day): void {
    this.router.navigate(['/day', day.id]);
  }

  deleteGoal(goal: Goal): void {
    this.sprintService
      .deleteGoal(goal)
      .then(() => {
        this.sprint.goals = this.sprint.goals.filter(h => h !== goal);
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.sprintService.update(this.sprint)
      .then(() => this.goBack());
  }
}
