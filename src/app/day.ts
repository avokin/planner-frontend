import {Task} from './task';
export class Day {
  id: number;
  notes: string;
  tasks: Task[];

  getPresentation(): String {
    let tmp: number = this.id;
    let day = tmp % 100;
    tmp = Math.trunc(tmp / 100);
    let month = tmp % 100;
    let year = Math.trunc(tmp / 100);

    return `${year}-${month}-${day}`;
  }
}
