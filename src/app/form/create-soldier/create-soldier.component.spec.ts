import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSoldierComponent } from './create-soldier.component';

describe('CreateSoldierComponent', () => {
  let component: CreateSoldierComponent;
  let fixture: ComponentFixture<CreateSoldierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSoldierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSoldierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
