import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudySessionNew } from './study-session-new';

describe('StudySessionNew', () => {
  let component: StudySessionNew;
  let fixture: ComponentFixture<StudySessionNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudySessionNew],
    }).compileComponents();

    fixture = TestBed.createComponent(StudySessionNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
