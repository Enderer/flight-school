import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ModalModule } from 'ngx-bootstrap';
import { PageBaseComponent } from './containers/page-base/page-base.component';
import { SitenavComponent, ModalMarksComponent } from './components';
import { reducers, metaReducers } from './reducers';
import { MarkPipe } from './pipes';
import { FontResizerDirective } from './directives/font-resizer.directive';
import { GameDurationPipe } from './pipes/game-duration.pipe';
import { SortablejsModule } from 'angular-sortablejs';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    ModalModule.forRoot(),
    SortablejsModule
  ],
  declarations: [
    PageBaseComponent, 
    SitenavComponent, 
    ModalMarksComponent, 
    MarkPipe, 
    FontResizerDirective, 
    GameDurationPipe
  ],
  entryComponents: [ModalMarksComponent],
  exports: [
    PageBaseComponent,
    FontResizerDirective
  ]
})
export class FlightSchoolModule { }
