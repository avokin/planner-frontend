import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Sprint }         from './sprint';
import { SprintService }  from './sprint.service';
@Component({
  selector: 'sprint',
  templateUrl: './sprint.component.html',
  styleUrls: [ './sprint.component.css' ],
  providers: [SprintService]
})
export class SprintComponent implements OnInit {
  sprint: Sprint;

  constructor(
    private sprintService: SprintService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.sprintService.getSprint(+params['id']))
      .subscribe(sprint => this.sprint = sprint);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.sprintService.update(this.sprint)
      .then(() => this.goBack());
  }
}
