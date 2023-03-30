import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateActivityUserComponent } from './update-activity-user.component';

describe('UpdateActivityUserComponent', () => {
  let component: UpdateActivityUserComponent;
  let fixture: ComponentFixture<UpdateActivityUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateActivityUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateActivityUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
