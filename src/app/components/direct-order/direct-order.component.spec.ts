import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectOrderComponent } from './direct-order.component';

describe('DirectOrderComponent', () => {
  let component: DirectOrderComponent;
  let fixture: ComponentFixture<DirectOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectOrderComponent]
    });
    fixture = TestBed.createComponent(DirectOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
