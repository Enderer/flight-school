import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { SitenavComponent } from '../../components';
import { PageBaseComponent } from './page-base.component';
import * as Pipes from '../../pipes';

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
      declarations: [ 
        PageBaseComponent, 
        SitenavComponent, 
        Pipes.MarkPipe,
        Pipes.GameDurationPipe
      ],
      imports: [],
      providers: [
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
