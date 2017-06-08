import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DialogService } from 'ng2-bootstrap-modal';
import * as _ from 'lodash';

import { Turn, Score, Throw, Target, Selected } from '../../models/score';
import { Mark } from '../../models/mark';
import { ModalMarksComponent } from '../../components';

import * as fromRoot from '../../reducers';
import * as selectedActions from '../../actions/selected.actions';
import * as countActions from '../../actions/count.actions';
import * as marksModalActions from '../../actions/marks-modal.actions';
import * as marksActions from '../../actions/marks.actions';
import * as turnsActions from '../../actions/turns.actions';

const emptyTarget = { first: false, second: false, third: false };

@Component({
    selector: 'fs-page-base',
    templateUrl: './page-base.component.html',
    styleUrls: ['./page-base.component.scss']
})
export class PageBaseComponent implements OnInit, OnDestroy {

    count$: Observable<number>;
    showMarks$: Observable<boolean>;
    showMarksSub: Subscription;

    marks$: Observable<Mark[]>;
    marks: Mark[];
    
    turns$: Observable<Turn[]>;
    turns: Turn[];

    score$: Observable<{[id: string]: Score}>;
    scores: {[id: string]: Score} = {};

    target$: Observable<Target>;
    target: Target;

    selected$: Observable<Selected>;
    selected: Selected;

    activeMarks$: Observable<Mark[]>;
    activeMarks: {[id: string]: Mark};

    constructor(
        private store: Store<fromRoot.State>,
        private dialogService: DialogService) {

        this.count$ = this.store.select(fromRoot.getCount);
        this.showMarks$ = this.store.select(fromRoot.getMarksModalShow);
        this.marks$ = this.store.select(fromRoot.getMarks);
        this.turns$ = this.store.select(fromRoot.getTurns);
        this.score$ = this.store.select(fromRoot.getScore);
        this.target$ = this.store.select(fromRoot.getNextTarget);
        this.selected$ = this.store.select(fromRoot.getSelected).do(selected => console.log('PageBase::selected$ success', selected));
        this.activeMarks$ = this.store.select(fromRoot.getActiveMarks);
     }

    ngOnInit() {
        this.marks$.subscribe(marks => {
            console.debug('PageBase::marks$ success', marks);
            this.marks = marks;
            this.store.dispatch(new selectedActions.SelectedUpdateComplete(emptyTarget));
        });

        this.showMarks$.subscribe(show => {
            console.debug('PageBase::showMarks$', show);
            if (show) { 
                this.openMarksModal(); 
            } else { 
                this.closeMarksModal(); 
            }
        });

        this.turns$.subscribe(turns => this.turns = turns);
        this.score$.subscribe(scores => this.scores = scores);
        this.target$.subscribe(target => this.target = target);
        this.selected$.subscribe(selected => this.selected = selected);
        this.activeMarks$.subscribe(activeMarks => this.activeMarks = _.keyBy(activeMarks, m => m.id));
    }

    ngOnDestroy() {    }

    onCountChanged(count: number): void {
        console.log('PageBase::onCountChanged', count);
        const action = new countActions.CountUpdateComplete(count);
        this.store.dispatch(action);
    }

    onMarksClicked() {
        this.store.dispatch(new marksModalActions.Show());
    }

    select(mark: Mark): void {
        console.debug('PageBase::select', mark);

        if (!this.isTarget(mark)) { return; }

        let selected: Selected = null;

        const none = { first: false, second: false, third: false };
        const one = { first: true, second: false, third: false };
        const two = { first: true, second: true, third: false };
        const three = { first: true, second: true, third: true };


        if (this.equal(this.target.first, mark)) {
            if (this.selected.first) { 
                selected = none;
            } else { 
                selected = one; 
            }
        } else if (this.equal(this.target.second, mark)) {
            if (this.selected.second) {
                selected = one;
            } else {
                selected = two;
            }
        } else if (this.equal(this.target.third, mark)) {
            if (this.selected.third) {
                selected = two;
            } else {
                selected = three;
            }
        }

        this.store.dispatch(new selectedActions.SelectedUpdateComplete(selected));
    }

    enterClicked(): void {
        const turn = new Turn();
        turn.start = this.target.first;
        turn.target = this.target;

        if (this.target && this.target.first && this.isSelected(this.target.first)) { 
            turn.throws.push(new Throw(this.target.first));
        }
        if (this.target && this.target.second && this.isSelected(this.target.second)) {
            turn.throws.push(new Throw(this.target.second));
        }
        if (this.target && this.target.third && this.isSelected(this.target.third)) {
            turn.throws.push(new Throw(this.target.third));
        }

        const turns = [...this.turns, turn];

        this.store.dispatch(new turnsActions.TurnsUpdateComplete(turns));
        this.store.dispatch(new selectedActions.SelectedUpdateComplete({ first: null, second: null, third: null }));
    }

    onResetClicked(): void {
        console.debug('PageBase::onResetClicked');
        this.store.dispatch(new turnsActions.TurnsUpdateComplete([]));
        this.store.dispatch(new selectedActions.SelectedUpdateComplete(emptyTarget));
    }

    cancelClicked(): void {
        console.log('PagePase::cancelClicked');

        // If any marks are selected clear them out
        if (this.selected && (this.selected.first || this.selected.second || this.selected.third)) {
                this.store.dispatch(new selectedActions.SelectedUpdateComplete(emptyTarget));
                return;
         }


        const turns = this.turns;
        if (!(turns && turns.length > 0)) { return; }
        const newTurns = turns.slice(0, turns.length - 1);
        this.store.dispatch(new turnsActions.TurnsUpdateComplete(newTurns));
    }

    private isTarget(mark: Mark): boolean {
        if (this.target == null) { return false; }

        if (this.equal(this.target.first, mark)) { return true; }
        if (this.equal(this.target.second, mark)) { return true; }
        if (this.equal(this.target.third, mark)) { return true; }

        return false;
    }

    isActive(mark: Mark): boolean {
        if (mark == null || this.activeMarks == null) { return false; }
        const active = !!this.activeMarks[mark.id];
        return active;
    }

    get showButtons(): boolean {
        return this.marks && this.marks.length > 0;
    }

    private openMarksModal() {
        console.debug('PageBase::openMarksModal');
        const options = { 
            backdropColor: 'rgba(0,0,0, .8)', 
            closeByClickingOutside: true
        };

        const data = {
            title: 'Confirm title',
            message: 'Confirm message',
            marks: this.marks
        };

        this.showMarksSub = this.dialogService.addDialog(
            ModalMarksComponent, 
            data,
            options
        ).subscribe((isConfirmed) => this.isConfirmed(isConfirmed));
    }

    
    private closeMarksModal() {
        console.debug('PageBase::closeMarksModal');
        if (this.showMarksSub && !this.showMarksSub.closed) {
            this.showMarksSub.unsubscribe();
        }
    }


    private isConfirmed(marks: Mark[]) {
        console.debug('PageBase::isConfirmed success', marks);
        this.store.dispatch(new marksModalActions.Hide());
        if (marks) {
            this.store.dispatch(new marksActions.MarksUpdateComplete(marks));
            this.store.dispatch(new turnsActions.TurnsUpdateComplete([]));
        }
    }

    private isFirstTarget(mark: Mark): boolean {
        if (this.target == null) { return false; }
        if (mark == null) { return false; }

        return (this.target.first && this.target.first.id === mark.id);
    }

    private isSecondTarget(mark: Mark): boolean {
        if (this.target == null) { return false; }
        if (mark == null) { return false; }

        return (this.target.second && this.target.second.id === mark.id);
    }
    private isThirdTarget(mark: Mark): boolean {
        if (this.target == null) { return false; }
        if (mark == null) { return false; }

        return (this.target.third && this.target.third.id === mark.id);
    }

    private isSelected(mark: Mark): boolean {
        if (mark == null) { return false; }
        if (this.target == null) { return false; }
        if (this.select == null) { return false; }

        if (this.equal(mark, this.target.first) && this.selected.first) { return true; }
        if (this.equal(mark, this.target.second) && this.selected.second) { return true; }
        if (this.equal(mark, this.target.third) && this.selected.third) { return true; }

        return false;
    }

    private equal(m1: Mark, m2: Mark): boolean {
        return m1 && m2 && m1.id === m2.id;
    }

    get hasSelected(): boolean {
        return !!this.selected.first ||
            !!this.selected.second || 
            !!this.selected.third;
    }

}
