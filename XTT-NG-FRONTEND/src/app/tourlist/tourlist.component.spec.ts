import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourlistComponent } from './tourlist.component';

describe('TourlistComponent', () => {
  let component: TourlistComponent;
  let fixture: ComponentFixture<TourlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TourlistComponent]
    });
    fixture = TestBed.createComponent(TourlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
