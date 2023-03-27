import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityAdminComponent } from './activity-admin.component';

describe('ActivityAdminComponent', () => {
  let component: ActivityAdminComponent;
  let fixture: ComponentFixture<ActivityAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
