import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';


@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit {
  dayId: number;
  cachedUrl: SafeResourceUrl;
  cachedDayId: number;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.dayId = +params['id'];
    });
  }

  getCalendarUrl(): SafeResourceUrl {
    if (this.cachedUrl == null || this.cachedDayId !== this.dayId) {
      this.cachedDayId = this.dayId;
      this.cachedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://calendar.google.com/calendar/embed?showTitle=0&showNav=0&showDate=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0&mode=DAY&wkst=1&bgcolor=%23FFFFFF&src=andrey.vokin%40gmail.com&color=%231B887A&ctz=Europe%2FBerlin&dates=${this.dayId}/${this.dayId}`);
    }
    return this.cachedUrl;
  }
}
