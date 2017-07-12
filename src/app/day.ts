import {Task} from './task';
import DateUtil from './util/date.util';

export class Day {
  id: number;
  notes: string;
  tasks: Task[];
  sprint_id: number;

  constructor(rawData: any) {
    this.id = rawData.id;
    this.notes = rawData.notes;
    this.sprint_id = rawData.sprint_id;

    this.tasks = [];
    if (rawData.tasks) {
      for (let task of rawData.tasks) {
        let myTask = new Task(task);
        this.tasks.push(myTask);
      }
    }
  }

  getPresentation(): String {
    return DateUtil.getPresentation(this.id);
  }
}
