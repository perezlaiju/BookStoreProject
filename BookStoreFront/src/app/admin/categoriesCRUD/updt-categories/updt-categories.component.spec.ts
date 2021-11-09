import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdtCategoriesComponent } from './updt-categories.component';

describe('UpdtCategoriesComponent', () => {
  let component: UpdtCategoriesComponent;
  let fixture: ComponentFixture<UpdtCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdtCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdtCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
