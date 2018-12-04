import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterSummaryComponent } from './chapter-summary.component';

describe('ChapterSummaryComponent', () => {
  let component: ChapterSummaryComponent;
  let fixture: ComponentFixture<ChapterSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
