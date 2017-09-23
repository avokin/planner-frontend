import {Goal} from './goal';
import {Day} from './day';
export class Sprint {
  id: number;
  from: number;
  to: number;
  goals: Goal[];
  days: Day[];
}
