import DateUtil from './util/date.util';

export class Task {
  id: number;
  name: string;
  finished: boolean;
  day_id: number;

  _dueDate: { [key: string]: number } = null;

  constructor(rawData: Task) {
    this.id = rawData.id;
    this.name = rawData.name;
    this.finished = rawData.finished;
    this.day_id = rawData.day_id;
  }

  get dueDate(): { [key: string]: number } {
    if (this._dueDate == null) {
      this._dueDate = DateUtil.getDateAttributesFromDayId(this.day_id);
    }
    return this._dueDate;
  }

  set dueDate(val: { [key: string]: number }) {
    console.log('Setting new dueDate: ' + val);
    this._dueDate = val;
    this.day_id = val['year'] * 10000 + val['month'] * 100 + val['day'];
  }
}
