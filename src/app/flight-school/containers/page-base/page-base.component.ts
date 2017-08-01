import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DialogService } from 'ng2-bootstrap-modal';
import * as _ from 'lodash';

import { Turn, Score, Throw, Target, Selected } from '../../models';
import { none, one, two, three } from '../../models/selected';
import { Mark } from '../../models/mark';
import { ModalMarksComponent } from '../../components';

import * as fromRoot from '../../reducers';
import * as selectedActions from '../../actions/selected.actions';
import * as countActions from '../../actions/count.actions';
import * as marksModalActions from '../../actions/marks-modal.actions';
import * as marksActions from '../../actions/marks.actions';
import * as turnsActions from '../../actions/turns.actions';
import * as Selectors from '../../state/selectors/index.selector';

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

    isComplete$: Observable<boolean>;
    isComplete: boolean;

    constructor(
        private store: Store<fromRoot.State>,
        private dialogService: DialogService) {

        this.count$ = this.store.select(Selectors.getCount);
        this.showMarks$ = this.store.select(Selectors.getMarksModalShow);
        this.marks$ = this.store.select(Selectors.getMarks);
        this.turns$ = this.store.select(Selectors.getTurns);
        this.score$ = this.store.select(Selectors.getScore);
        this.target$ = this.store.select(Selectors.getNextTarget);
        this.selected$ = this.store.select(Selectors.getSelected).do(selected => console.log('PageBase::selected$ success', selected));
        this.activeMarks$ = this.store.select(Selectors.getActiveMarks);
        this.isComplete$ = this.store.select(Selectors.getIsComplete);
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
        this.isComplete$.subscribe(isComplete => this.isComplete = isComplete);
    }

    ngOnDestroy() {    }

    onCountChanged(count: number): void {
        console.log('PageBase::onCountChanged', count);
        const action = new countActions.CountUpdateComplete(count);
        this.store.dispatch(action);
    }

    onMarksClicked(event: Event) {
        console.debug('PageBaseComponent::onMarksClicked');
        this.store.dispatch(new marksModalActions.Show());
        if (event) {
            event.stopImmediatePropagation();
            event.preventDefault();
        }
    }

    select(mark: Mark, event: Event): void {
        console.debug('PageBase::select', mark);
        event.stopImmediatePropagation();
        event.preventDefault();

        if (!this.isTarget(mark)) { return; }

        let selected: Selected = null;




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

    enterClicked(event: Event): void {
        console.debug('PageBaseComponent::enterClicked');
        event.stopImmediatePropagation();
        event.preventDefault();

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

    cancelClicked(event: Event): void {
        console.log('PagePase::cancelClicked');
        event.stopImmediatePropagation();
        event.preventDefault();


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

    isTarget(mark: Mark): boolean {
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

    isClosed(mark: Mark): boolean {
        return !this.isActive(mark) && !this.isComplete;
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

        const data = { marks: this.marks };

        this.showMarksSub = this.dialogService.addDialog(
            ModalMarksComponent, 
            data,
            options
        ).subscribe(isConfirmed => this.isConfirmed(isConfirmed));
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
        if (marks == null) { return; }

        // Update to the new marks and clear out the turns
        this.store.dispatch(new marksActions.MarksUpdateComplete(marks));
        this.store.dispatch(new turnsActions.TurnsUpdateComplete([]));
    }

    isFirstTarget(mark: Mark): boolean {
        if (this.target == null) { return false; }
        if (mark == null) { return false; }

        return (this.target.first && this.target.first.id === mark.id);
    }

    isSecondTarget(mark: Mark): boolean {
        if (this.target == null) { return false; }
        if (mark == null) { return false; }

        return (this.target.second && this.target.second.id === mark.id);
    }
    isThirdTarget(mark: Mark): boolean {
        if (this.target == null) { return false; }
        if (mark == null) { return false; }

        return (this.target.third && this.target.third.id === mark.id);
    }
    
    isSelected(mark: Mark): boolean {
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
