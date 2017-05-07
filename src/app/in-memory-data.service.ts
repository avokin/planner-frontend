import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let tasks = [
      {id: 11, name: 'To start'},
      {id: 12, name: 'To continue'},
      {id: 13, name: 'To finish'},
      {id: 14, name: 'To test'},
      {id: 15, name: 'To cleanup'},
      {id: 16, name: 'To check'},
      {id: 17, name: 'To work hard'},
      {id: 18, name: 'Not to give up'},
      {id: 19, name: 'To overcome'},
      {id: 20, name: 'To celebrate'}
    ];
    return {tasks};
  }
}
