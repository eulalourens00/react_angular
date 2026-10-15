import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegComponent } from './reg-component';

describe('RegComponent', () => {
  let component: RegComponent;
  let fixture: ComponentFixture<RegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
