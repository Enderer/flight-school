import { Action } from '@ngrx/store';

export const COUNT_UPDATE_COMPLETE = '[Count] Update Complete';

export class CountUpdateComplete implements Action {
  readonly type = COUNT_UPDATE_COMPLETE;
  constructor(public payload: number) { }
}

export type Actions = CountUpdateComplete;
