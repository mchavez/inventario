import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialAddEditComponent } from './material-add-edit.component';

describe('MaterialAddEditComponent', () => {
  let component: MaterialAddEditComponent;
  let fixture: ComponentFixture<MaterialAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
