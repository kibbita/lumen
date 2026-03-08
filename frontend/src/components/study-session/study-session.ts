import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-study-session',
  imports: [CommonModule, TuiButton],
  templateUrl: './study-session.html',
  styleUrl: './study-session.css',
})
export class StudySession {

  cards: any[] =[];
  currentIndex = 0;
  isFlipped = false;

get currentCard() {
  return this.cards[this.currentIndex];
}

flipCard() {
  this.isFlipped = !this.isFlipped;
}

nextCard() {
  this.isFlipped = false;
  this.currentIndex++;
}

}
