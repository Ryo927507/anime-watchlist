import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwHeader } from './aw-header';

describe('AwHeader', () => {
  let component: AwHeader;
  let fixture: ComponentFixture<AwHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
