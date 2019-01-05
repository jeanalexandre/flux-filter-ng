import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlowDialogComponent } from './add-flow-dialog.component';

describe('AddFlowDialogComponent', () => {
  let component: AddFlowDialogComponent;
  let fixture: ComponentFixture<AddFlowDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFlowDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFlowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
