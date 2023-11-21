import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdateUserComponent } from './pdate-user.component';

describe('PdateUserComponent', () => {
  let component: PdateUserComponent;
  let fixture: ComponentFixture<PdateUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdateUserComponent]
    });
    fixture = TestBed.createComponent(PdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
