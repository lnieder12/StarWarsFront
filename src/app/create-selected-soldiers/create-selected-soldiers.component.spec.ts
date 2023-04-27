import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSelectedSoldiersComponent } from './create-selected-soldiers.component';

describe('CreateSelectedSoldiersComponent', () => {
  let component: CreateSelectedSoldiersComponent;
  let fixture: ComponentFixture<CreateSelectedSoldiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSelectedSoldiersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSelectedSoldiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
