import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogService } from 'ng2-bootstrap-modal';
import { StoreModule } from '@ngrx/store';
import { SitenavComponent } from '../../components';
import { PageBaseComponent } from './page-base.component';
import { MarkPipe } from '../../pipes';

const state = {
    count: 0,
    marks: [],
    turns: [],
    marksModal: { show: false },
    selected: {}
};

describe('PageBaseComponent', () => {
  let component: PageBaseComponent;
  let fixture: ComponentFixture<PageBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageBaseComponent, SitenavComponent, MarkPipe ],
      imports: [StoreModule.provideStore({})],
      providers: [
        
        { provide: DialogService, useValue: { } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
