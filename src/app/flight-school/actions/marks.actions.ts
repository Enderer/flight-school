import { Action } from '@ngrx/store';
import { Mark } from '../models/mark';

export const MARKS_UPDATE_COMPLETE = '[Marks] Update Complete';

export class MarksUpdateComplete implements Action {
  readonly type = MARKS_UPDATE_COMPLETE;
  constructor(public payload: Mark[]) { }
}

export type Actions = MarksUpdateComplete;
