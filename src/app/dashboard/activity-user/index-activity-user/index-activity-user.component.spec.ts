import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexActivityUserComponent } from './index-activity-user.component';

describe('IndexActivityUserComponent', () => {
  let component: IndexActivityUserComponent;
  let fixture: ComponentFixture<IndexActivityUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexActivityUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexActivityUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
