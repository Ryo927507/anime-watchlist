import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwMain } from './aw-main';

describe('AwMain', () => {
  let component: AwMain;
  let fixture: ComponentFixture<AwMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
