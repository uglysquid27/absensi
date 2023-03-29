import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActivityUserComponent } from './create-activity-user.component';

describe('CreateActivityUserComponent', () => {
  let component: CreateActivityUserComponent;
  let fixture: ComponentFixture<CreateActivityUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateActivityUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateActivityUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
