import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService } from 'ng2-bootstrap-modal';
import { SitenavComponent } from '../../components';
import { PageBaseComponent } from './page-base.component';
import { MarkPipe } from '../../pipes';
import { ReducerModule } from '../../reducers';

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
      imports: [ReducerModule],
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
