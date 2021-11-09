import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdtCouponComponent } from './updt-coupon.component';

describe('UpdtCouponComponent', () => {
  let component: UpdtCouponComponent;
  let fixture: ComponentFixture<UpdtCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdtCouponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdtCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
