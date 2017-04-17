import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitenavComponent } from './sitenav.component';

describe('SitenavComponent', () => {
  let component: SitenavComponent;
  let fixture: ComponentFixture<SitenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitenavComponent ]
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
