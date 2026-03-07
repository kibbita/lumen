import { Component, input, InputSignal } from '@angular/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { DeckGetDto } from '../../../models/deckGetDto';
import { TuiChip } from '@taiga-ui/kit';
import { TuiAutoColorPipe } from '@taiga-ui/core';
@Component({
  selector: 'app-deck-component',
  imports: [TuiCardLarge, TuiHeader, TuiChip],
  templateUrl: './deck-component.html',
  styleUrl: './deck-component.css',
})
export class DeckComponent {
  deck: InputSignal<DeckGetDto | null> = input<DeckGetDto | null>(null);

}
