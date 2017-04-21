import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { PageBaseComponent } from './containers/page-base/page-base.component';
import { SitenavComponent, ModalMarksComponent } from './components';
import { reducer } from './reducers';
import { MarkPipe } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    BootstrapModalModule,
    StoreModule.provideStore(reducer),
  ],
  declarations: [
    PageBaseComponent, 
    SitenavComponent, 
    ModalMarksComponent, 
    MarkPipe
  ],
  entryComponents:[ModalMarksComponent],
  exports: [
    PageBaseComponent
  ]
})
export class FlightSchoolModule { }
