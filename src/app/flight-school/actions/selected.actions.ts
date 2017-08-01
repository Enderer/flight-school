import { Action } from '@ngrx/store';
import { Selected } from '../models';

export const SELECTED_UPDATE_COMPLETE = '[Selected] Update Complete';

export class SelectedUpdateComplete implements Action {
    readonly type = SELECTED_UPDATE_COMPLETE;
    constructor(public payload: Selected) { }
}

export type Actions = SelectedUpdateComplete;
