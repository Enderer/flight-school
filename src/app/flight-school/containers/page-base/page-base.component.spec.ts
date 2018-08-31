import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageBaseComponent } from './page-base.component';
import { FlightSchoolModule } from '../../flight-school.module';

describe('PageBaseComponent', () => {
  let component: PageBaseComponent;
  let fixture: ComponentFixture<PageBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FlightSchoolModule ],
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
