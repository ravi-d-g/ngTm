import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CComponent } from './CComponent';

describe('CComponent', () => {
  let component: CComponent;
  let fixture: ComponentFixture<CComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
