import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalMarksComponent } from './modal-marks.component';
import { FlightSchoolModule } from '../../flight-school.module';

describe('ModalMarksComponent', () => {
  let component: ModalMarksComponent;
  let fixture: ComponentFixture<ModalMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FlightSchoolModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
