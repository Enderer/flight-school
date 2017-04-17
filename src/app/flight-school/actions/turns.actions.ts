import { Action } from '@ngrx/store';
import { Turn } from '../models/score';

export const TURNS_UPDATE_COMPLETE = '[Turns] Update Complete';

export class TurnsUpdateComplete implements Action {
  readonly type = TURNS_UPDATE_COMPLETE;
  constructor(public payload: Turn[]) { }
}

export type Actions = TurnsUpdateComplete;
