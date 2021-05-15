import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageColumnChartComponent } from './image-column-chart.component';

describe('ImageColumnChartComponent', () => {
  let component: ImageColumnChartComponent;
  let fixture: ComponentFixture<ImageColumnChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageColumnChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageColumnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
