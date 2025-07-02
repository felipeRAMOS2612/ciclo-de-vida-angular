import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleVisualizer } from './cycle-visualizer';

describe('CycleVisualizer', () => {
  let component: CycleVisualizer;
  let fixture: ComponentFixture<CycleVisualizer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CycleVisualizer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CycleVisualizer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
