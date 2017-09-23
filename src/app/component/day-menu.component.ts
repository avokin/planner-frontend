import 'rxjs/add/operator/switchMap';
import {Component, OnInit}      from '@angular/core';
import {Router} from '@angular/router';
import {Day} from '../model/day';
import {DayService} from '../service/day.service';
import DateUtil from '../util/date.util';


@Component({
  selector: '[day-menu]',
  templateUrl: './day-menu.component.html',
  providers: [DayService]
})
export class DayMenuComponent implements OnInit {
  day: Day;

  constructor(
    private router: Router,
    private dayService: DayService
  ) {}

  ngOnInit(): void {
    this.updateCurrentDate();
    this.router.events.subscribe(() => {
      this.updateCurrentDate();
    });
  }

  updateCurrentDate() {
    const value = this.router.url;
    let id = +value.toString().substring(value.toString().lastIndexOf('/') + 1);
    if (this.day == null || this.day.id !== id) {
      this.dayService.getDay(id)
        .then(day => {
          this.day = day;
        });
    }
  }

  // noinspection JSUnusedGlobalSymbols
  gotoSprint() {
    this.router.navigate(['/sprint', this.day.sprint_id]);
    event.preventDefault();
  }

  // noinspection JSUnusedGlobalSymbols
  gotoNextDay() {
    this.router.navigate(['/day', DateUtil.getNextDayId(this.day.id)]);
    event.preventDefault();
  }

  // noinspection JSUnusedGlobalSymbols
  gotoPreviousDay() {
    this.router.navigate(['/day', DateUtil.getPreviousDayId(this.day.id)]);
    event.preventDefault();
  }
}
