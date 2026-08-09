import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwFooter } from './aw-footer';

describe('AwFooter', () => {
  let component: AwFooter;
  let fixture: ComponentFixture<AwFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
