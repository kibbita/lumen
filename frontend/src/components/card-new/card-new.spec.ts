import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardNew } from './card-new';

describe('CardNew', () => {
  let component: CardNew;
  let fixture: ComponentFixture<CardNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNew],
    }).compileComponents();

    fixture = TestBed.createComponent(CardNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
