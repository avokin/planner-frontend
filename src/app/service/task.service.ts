import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Task } from '../model/task';
import ServiceUtil from './service-util';
import {Day} from "../model/day";
import {Sprint} from "../model/sprint";

@Injectable()
export class TaskService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private tasksUrl = ServiceUtil.HOST + 'days/1/tasks';  // URL to web api

  constructor(private http: Http) { }
  getTasks(): Promise<Task[]> {
    return this.http.get(this.tasksUrl)
      .toPromise()
      .then(response => response.json().data as Task[])
      .catch(this.handleError);
  }

  getOverdueTasks(dayId: number): Promise<Task[]> {
    console.log('Getting overdue tasks for day: ' + dayId);
    return this.http.get(ServiceUtil.HOST + `days/${dayId}/overdue`)
      .toPromise()
      .then((response): Task[] => {
        console.log('Overdue tasks response: ' + response.json());
        const rawTasks = response.json() as Task[];
        var realTasks = [];
        for (let task of rawTasks) {
          let myTask = new Task(task);
          realTasks.push(myTask);
        }
        return realTasks;
      })
      .catch(this.handleError);
  }

  getTask(id: number): Promise<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Task)
      .catch(this.handleError);
  }

  update(task: Task): Promise<Task> {
    const url = `${this.tasksUrl}/${task.id}`;
    return this.http
      .put(url, JSON.stringify(task), {headers: this.headers})
      .toPromise()
      .then(() => task)
      .catch(this.handleError);
  }

  create(name: string): Promise<Task> {
    return this.http
      .post(this.tasksUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Task)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
