import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightSchoolModule } from '../../flight-school.module';
import { SitenavComponent } from './sitenav.component';

describe('SitenavComponent', () => {
  let component: SitenavComponent;
  let fixture: ComponentFixture<SitenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FlightSchoolModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
