import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesertaComponent } from './peserta.component';

describe('PesertaComponent', () => {
  let component: PesertaComponent;
  let fixture: ComponentFixture<PesertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesertaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
