import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaAddEditComponent } from './categoria-add-edit.component';

describe('CategoriaAddEditComponent', () => {
  let component: CategoriaAddEditComponent;
  let fixture: ComponentFixture<CategoriaAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
