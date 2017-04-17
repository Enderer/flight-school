import { Action } from '@ngrx/store';

export const SHOW = '[MarksModal] Show';
export const HIDE = '[MarksModal] Hide';

export class Show implements Action { readonly type = SHOW; }
export class Hide implements Action { readonly type = HIDE; }

export type Actions = Show | Hide;
