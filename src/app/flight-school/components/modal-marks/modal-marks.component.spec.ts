import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalMarksComponent } from './modal-marks.component';

describe('ModalMarksComponent', () => {
  let component: ModalMarksComponent;
  let fixture: ComponentFixture<ModalMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMarksComponent ],
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
