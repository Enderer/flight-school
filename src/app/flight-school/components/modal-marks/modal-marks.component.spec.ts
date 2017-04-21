import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService } from 'ng2-bootstrap-modal';

import { ModalMarksComponent } from './modal-marks.component';

describe('ModalMarksComponent', () => {
  let component: ModalMarksComponent;
  let fixture: ComponentFixture<ModalMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMarksComponent ],
      providers: [{ provide: DialogService, useValue: {}}]
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
