import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProcessComponent } from './select-process.component';

describe('SelectProcessComponent', () => {
  let component: SelectProcessComponent;
  let fixture: ComponentFixture<SelectProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
