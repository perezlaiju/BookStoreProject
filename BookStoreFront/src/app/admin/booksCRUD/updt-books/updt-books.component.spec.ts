import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdtBooksComponent } from './updt-books.component';

describe('UpdtBooksComponent', () => {
  let component: UpdtBooksComponent;
  let fixture: ComponentFixture<UpdtBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdtBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdtBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
