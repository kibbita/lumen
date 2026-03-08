import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { CommonModule } from '@angular/common';
import { StudySessionService } from '../../services/study-session.service';
import { DeckGetDto } from '../../models/deckGetDto';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiIcon, TuiLink, TuiTextfield } from '@taiga-ui/core';
import { UserService } from '../../services/user.service';
import { DeckComponent } from "../common/deck-component/deck-component";
import { TuiButtonClose, TuiButtonGroup, TuiDataListWrapper } from '@taiga-ui/kit';
import { userInfo } from 'os';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-study-session-new',
  imports: [CommonModule, FormsModule, TuiTextfield, TuiIcon, DeckComponent, TuiButton, TuiButtonClose],
  templateUrl: './study-session-new.html',
  styleUrl: './study-session-new.css',
})
export class StudySessionNew implements OnInit{

  decksService = inject(DeckService);
  service = inject(StudySessionService);
  userService = inject(UserService);
  toastService = inject(ToastService);
  search = signal('');

  loggedUserId: WritableSignal<number|null> = signal(null);
  selectedDecks: WritableSignal<DeckGetDto[]> = signal([]);
  allDecks:  WritableSignal<DeckGetDto[]> = signal([]);
  
  ngOnInit(): void {
    this.userService.getMe().subscribe({
      next: (resp) => {
        this.loggedUserId.set(resp.id!);
        this.fetchDecks('',this.loggedUserId()!);

      }
    });
  }

  constructor(){
          effect(() => {
        const query = this.search();
        this.fetchDecks(query, this.loggedUserId()!);
      });
  }
    fetchDecks(queryText: string = '', userId: number) {
    const filters: any = queryText ? { queryText, userId } : {};
    this.decksService.get(filters).subscribe({
      next: (resp) => {
        const selectedIds = this.selectedDecks().map(d => d.id);
        const filtered = resp.filter(d => !selectedIds.includes(d.id));
        this.allDecks.set(filtered);
      },
    });
  }

  onDeckSelected(id: number) {
      const deck = this.allDecks().find(x => x.id === id);
      if (!deck) return; // safety check

      this.selectedDecks().push(deck);

      const index = this.allDecks().findIndex(x => x.id === id);
      if (index !== -1) {
          this.allDecks().splice(index, 1);
      }
  }

  onSelectionRemove(id: number){
      const deck = this.selectedDecks().find(x => x.id === id);
      if (!deck) return; // safety check

      this.allDecks().push(deck);

      const index = this.selectedDecks().findIndex(x => x.id === id);
      if (index !== -1) {
          this.selectedDecks().splice(index, 1);
      }
  }

  createStudySession(){
    if (this.selectedDecks().length == 0) return;
    this.service.save({deckIds: this.selectedDecks().map(x => x.id)}).subscribe({
      next: (resp) => {
        this.toastService.showSuccess('Session created successfully')
      },
      error: (err) => {
        this.toastService.showError('Error while creating session')
      }
    })
  }
}
