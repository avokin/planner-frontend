import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Sprint } from '../model/sprint';
import {Goal} from '../model/goal';
import {Day} from '../model/day';

@Injectable()
export class SprintService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private sprintsUrl = 'http://localhost:3000/sprints';  // URL to web api

  constructor(private http: Http) { }
  getSprints(): Promise<Sprint[]> {
    return this.http.get(this.sprintsUrl)
      .toPromise()
      .then(response => response.json() as Sprint[])
      .catch(this.handleError);
  }

  getSprint(id: number): Promise<Sprint> {
    const url = `${this.sprintsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => this.handleResponse(response))
      .catch(this.handleError);
  }

  handleResponse(response: Response): Sprint {
    const result = response.json() as Sprint;
    result.days = [];
    for (let i = result.from; i <= result.to; i++) {
      let day = new Day({'id': i});
      result.days.push(day);
    }
    return result;
  }

  update(sprint: Sprint): Promise<Sprint> {
    const url = `${this.sprintsUrl}/${sprint.id}`;
    return this.http
      .put(url, JSON.stringify(sprint), {headers: this.headers})
      .toPromise()
      .then(() => sprint)
      .catch(this.handleError);
  }

  create(from: number, to: number): Promise<Sprint> {
    return this.http
      .post(this.sprintsUrl, JSON.stringify({sprint: {from: from, to: to}}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Sprint)
      .catch(this.handleError);
  }

  createGoal(sprintId: number, name: string) {
    return this.http
      .post(this.sprintsUrl + '/' + sprintId + '/goals', JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Goal)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.sprintsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  deleteGoal(goal: Goal): Promise<void> {
    const url = `${this.sprintsUrl}/${goal.sprintId}/goals/${goal.id}`;
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
