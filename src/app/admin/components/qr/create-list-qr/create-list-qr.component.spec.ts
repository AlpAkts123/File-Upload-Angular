import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListQrComponent } from './create-list-qr.component';

describe('CreateListQrComponent', () => {
  let component: CreateListQrComponent;
  let fixture: ComponentFixture<CreateListQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateListQrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateListQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
