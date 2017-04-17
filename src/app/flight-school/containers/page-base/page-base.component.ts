import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DialogService } from 'ng2-bootstrap-modal';
import * as _ from 'lodash';

import { Turn, Score, Throw } from '../../models/score';
import { Mark } from '../../models/mark';
import { ModalMarksComponent } from '../../components';

import * as fromRoot from '../../reducers';
import * as countActions from '../../actions/count.actions';
import * as marksModalActions from '../../actions/marks-modal.actions';
import * as marksActions from '../../actions/marks.actions';


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

    constructor(
        private store: Store<fromRoot.State>,
        private dialogService: DialogService) {

        this.count$ = this.store.select(fromRoot.getCount);
        this.showMarks$ = this.store.select(fromRoot.getMarksModalShow);
        this.marks$ = this.store.select(fromRoot.getMarks);
        this.turns$ = this.store.select(fromRoot.getTurns);
        this.score$ = this.store.select(fromRoot.getScore);
     }

    ngOnInit() {
        this.marks$.subscribe(marks => {
            console.debug('PageBase::marks$ success', marks);
            this.marks = marks;
        });

        this.showMarks$.subscribe(show => {
            console.debug('PageBase::showMarks$', show);
            if (show) { 
                this.openMarksModal(); 
            } else { 
                this.closeMarksModal(); 
            }
        });

        this.score$.subscribe(scores => this.scores = scores);
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
        }
    }
}
