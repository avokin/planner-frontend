import {Task} from './task';
export class Day {
  id: number;
  notes: string;
  tasks: Task[];

  static getPresentation(dayId: number): String {
    let tmp: number = dayId;
    let day = tmp % 100;
    tmp = Math.trunc(tmp / 100);
    let month = tmp % 100;
    let year = Math.trunc(tmp / 100);

    let monthString: String;
    if (month < 10) {
      monthString = '0' + month;
    } else {
      monthString = '' + month;
    }

    let dayString: String;
    if (day < 10) {
      dayString = '0' + day;
    } else {
      dayString = '' + day;
    }

    return `${year}-${monthString}-${dayString}`;
  }

  getPresentation(): String {
    return Day.getPresentation(this.id);
  }
}
