import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiderwebComponent } from './spiderweb.component';

describe('SpiderwebComponent', () => {
  let component: SpiderwebComponent;
  let fixture: ComponentFixture<SpiderwebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpiderwebComponent]
    });
    fixture = TestBed.createComponent(SpiderwebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
