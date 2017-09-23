import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Day } from '../model/day';
import {Task} from '../model/task';

@Injectable()
export class DayService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private daysUrl = 'http://localhost:3000/days';  // URL to web api

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  constructor(private http: Http) { }

  getDay(id: number): Promise<Day> {
    const url = `${this.daysUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then((response): Day => new Day(response.json()))
      .catch(DayService.handleError);
  }

  update(day: Day): Promise<Day> {
    const url = `${this.daysUrl}/${day.id}`;
    return this.http
      .put(url, JSON.stringify(day), {headers: this.headers})
      .toPromise()
      .then(() => day)
      .catch(DayService.handleError);
  }

  createTask(dayId: number, name: string) {
    return this.http
      .post(this.daysUrl + '/' + dayId + '/tasks', JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Task)
      .catch(DayService.handleError);
  }

  deleteTask(task: Task): Promise<void> {
    const url = `${this.daysUrl}/${task.day_id}/tasks/${task.id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(DayService.handleError);
  }

  completeTask(task: Task): Promise<Task> {
    const url = `${this.daysUrl}/${task.day_id}/tasks/${task.id}`;
    return this.http
      .put(url, JSON.stringify(task), {headers: this.headers})
      .toPromise()
      .then(() => task)
      .catch(DayService.handleError);
  }
}
