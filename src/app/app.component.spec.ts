import { TestBed, async } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { PageBaseComponent } from './flight-school/containers/page-base/page-base.component';
import { SitenavComponent } from './flight-school/components';
import { GameDurationPipe } from './flight-school/pipes';
import { MarkPipe } from './flight-school/pipes';
import { ModalModule } from 'ngx-bootstrap';

const state = {
    count: 0,
    marks: [],
    turns: [],
    marksModal: { show: false },
    selected: {}
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ModalModule.forRoot()
      ],
      declarations: [
        AppComponent,
        PageBaseComponent,
        SitenavComponent,
        MarkPipe,
        GameDurationPipe,
      ],
      providers: []
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it(`should have as title 'app works!'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app works!');
  // }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('app works!');
  // }));
});
