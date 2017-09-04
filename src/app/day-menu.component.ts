import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Day} from './day';
import {DayService} from './day.service';


@Component({
  selector: 'day-menu',
  templateUrl: './day-menu.component.html',
})
export class DayMenuComponent implements OnInit {
  day: Day;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dayService: DayService,
    ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.dayService.getDay(+params['id']))
      .subscribe(day => this.day = day);
  }

  gotoSprint() {
    this.router.navigate(['/sprint', this.day.sprint_id]);
    event.preventDefault();
  }
}
