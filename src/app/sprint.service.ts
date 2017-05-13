import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Sprint } from './sprint';

@Injectable()
export class SprintService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private sprintsUrl = 'http://localhost:3000/sprints';  // URL to web api

  constructor(private http: Http) { }
  getSprints(): Promise<Sprint[]> {
    this.http.get(this.sprintsUrl)
      .toPromise()
      .then(response => console.log(response.json() as Sprint[]))
      .catch(this.handleError);
    return this.http.get(this.sprintsUrl)
      .toPromise()
      .then(response => response.json() as Sprint[])
      .catch(this.handleError);
  }

  getSprint(id: number): Promise<Sprint> {
    const url = `${this.sprintsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Sprint)
      .catch(this.handleError);
  }

  update(sprint: Sprint): Promise<Sprint> {
    const url = `${this.sprintsUrl}/${sprint.id}`;
    return this.http
      .put(url, JSON.stringify(sprint), {headers: this.headers})
      .toPromise()
      .then(() => sprint)
      .catch(this.handleError);
  }

  create(name: string): Promise<Sprint> {
    return this.http
      .post(this.sprintsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Sprint)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.sprintsUrl}/${id}`;
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
