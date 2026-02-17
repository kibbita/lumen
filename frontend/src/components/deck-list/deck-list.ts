import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { TuiIcon, TuiTextfield, TuiTextfieldMultiComponent } from '@taiga-ui/core';
import { TuiChevron } from '@taiga-ui/kit';
import { DeckGetDto } from '../../models/deckGetDto';
import { DeckService } from '../../services/deck.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-deck-list',
  imports: [CommonModule, TuiTextfield, TuiIcon, TuiChevron],
  templateUrl: './deck-list.html',
  styleUrl: './deck-list.css',
})
export class DeckList  implements OnInit {

  decks = signal<DeckGetDto[]>([]);
  loggedUserId = signal<number | null>(null);

  deckService = inject(DeckService);
  userService = inject(UserService);

  ngOnInit(): void {
    this.getUserAndDecks();
  }
    getUserAndDecks(){
    this.userService.getMe().subscribe({
      next: (resp) => {
        this.loggedUserId.set(resp.id!);
        this.getDecks();
      }, 
      error: (err) => {
        console.error(err);
      }
    });
  }
  
  getDecks(){
    this.deckService.getMine(this.loggedUserId()!).subscribe({
      next: (resp) => {
        this.decks.set(resp);
        console.log(this.decks());
      },
       error: (err) => {
          console.error(err);
      }
    })

  }
}
