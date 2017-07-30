import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { PageBaseComponent } from './containers';
import { SitenavComponent, ModalMarksComponent } from './components';
import { FontResizerDirective } from './directives';
import { MarkPipe } from './pipes';
import { ReducerModule } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    BootstrapModalModule,
    ReducerModule
  ],
  declarations: [
    PageBaseComponent, 
    SitenavComponent, 
    ModalMarksComponent, 
    MarkPipe, 
    FontResizerDirective
  ],
  entryComponents: [
    ModalMarksComponent
  ],
  exports: [
    PageBaseComponent,
    FontResizerDirective
  ]
})
export class FlightSchoolModule { }
