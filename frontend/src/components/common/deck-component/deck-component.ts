import { Component, inject, Input, input, InputSignal } from '@angular/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { DeckGetDto } from '../../../models/deckGetDto';
import { TuiChip } from '@taiga-ui/kit';
import { Router } from '@angular/router';
import { TuiAutoColorPipe, TuiDataList } from '@taiga-ui/core';
@Component({
  selector: 'app-deck-component',
  imports: [TuiCardLarge, TuiHeader, TuiChip, TuiAutoColorPipe],
  templateUrl: './deck-component.html',
  styleUrl: './deck-component.css',
})
export class DeckComponent {

  router = inject(Router)
  deck: InputSignal<DeckGetDto | null> = input<DeckGetDto | null>(null);
  @Input() showTags: boolean = false;           // normal input

  nagivateToDetail(){
    this.router.navigate([`decks/${this.deck()?.id}`])
  }
}
