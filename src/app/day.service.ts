import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Day } from './day';
import {Task} from './task';

@Injectable()
export class DayService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private daysUrl = 'http://localhost:3000/days';  // URL to web api

  constructor(private http: Http) { }
  getDays(): Promise<Day[]> {
    this.http.get(this.daysUrl)
      .toPromise()
      .then(response => console.log(response.json() as Day[]))
      .catch(this.handleError);
    return this.http.get(this.daysUrl)
      .toPromise()
      .then(response => response.json() as Day[])
      .catch(this.handleError);
  }

  getDay(id: number): Promise<Day> {
    const url = `${this.daysUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Day)
      .catch(this.handleError);
  }

  update(day: Day): Promise<Day> {
    const url = `${this.daysUrl}/${day.id}`;
    return this.http
      .put(url, JSON.stringify(day), {headers: this.headers})
      .toPromise()
      .then(() => day)
      .catch(this.handleError);
  }

  create(name: string): Promise<Day> {
    return this.http
      .post(this.daysUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Day)
      .catch(this.handleError);
  }

  createTask(dayId: number, name: string) {
    return this.http
      .post(this.daysUrl + '/' + dayId + '/tasks', JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Task)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.daysUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  deleteTask(task: Task): Promise<void> {
    const url = `${this.daysUrl}/${task.dayId}/tasks/${task.id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  completeTask(task: Task): Promise<Task> {
    const url = `${this.daysUrl}/${task.dayId}/tasks/${task.id}`;
    return this.http
      .put(url, JSON.stringify(task), {headers: this.headers})
      .toPromise()
      .then(() => task)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
