import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpperTitleUiComponent } from './upper-title-ui.component';

describe('UpperTitleUiComponent', () => {
  let component: UpperTitleUiComponent;
  let fixture: ComponentFixture<UpperTitleUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpperTitleUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpperTitleUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
