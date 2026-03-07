import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { TuiAppearance, TuiIcon, TuiTextfield, TuiTextfieldMultiComponent } from '@taiga-ui/core';
import { TuiButtonGroup, TuiChevron } from '@taiga-ui/kit';
import { DeckGetDto } from '../../models/deckGetDto';
import { DeckService } from '../../services/deck.service';
import { UserService } from '../../services/user.service';
import { DeckComponent } from "../common/deck-component/deck-component";
import { DeckFilterDto } from '../../models/filters/deckFilterDto';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deck-list',
  imports: [CommonModule, TuiTextfield, TuiIcon, TuiButtonGroup, TuiAppearance, DeckComponent, FormsModule],
  templateUrl: './deck-list.html',
  styleUrl: './deck-list.css',
})
export class DeckList  {

  decks = signal<DeckGetDto[]>([]);
  loggedUserId = signal<number | null>(null);
  search = signal('');
  deckService = inject(DeckService);
  userService = inject(UserService);
  router = inject(Router);

  constructor() {
    this.GetMe();
      effect(() => {
      const userId = this.loggedUserId()!;
      const name = this.search();

      console.log(userId)
      if (!userId) return;

      this.deckService
        .get({ userId, name} as DeckFilterDto)
        .subscribe({
          next: (resp) => this.decks.set(resp),
          error: (err) => console.error(err)
        });
    });
  }

  
  GetMe(){
        this.userService.getMe().subscribe({
      next: (resp) => {
        this.loggedUserId.set(resp.id!);
      }, 
      error: (err) => {
        console.error(err);
      }
    });
  }

  navigateTo(url: string){
    this.router.navigate([url]);
  }
}
