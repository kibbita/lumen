import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from '../../services/deck.service';
import { DeckDetailDto } from '../../models/deckDetailDto';
import { TuiCard } from '@taiga-ui/layout';
import { TuiAppearance, TuiIcon, TuiLink } from '@taiga-ui/core';
import { TuiButtonGroup } from '@taiga-ui/kit';

@Component({
  selector: 'app-deck-detail',
  imports: [CommonModule, TuiCard, TuiIcon, TuiLink,TuiButtonGroup, TuiAppearance],
  
  templateUrl: './deck-detail.html',
  styleUrl: './deck-detail.css',
})
export class DeckDetail implements OnInit{

  route = inject(ActivatedRoute);
  router = inject(Router);
  service = inject(DeckService);
  deckDetail: WritableSignal<DeckDetailDto | null> = signal(null);
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id){
      const deckId = Number(id)
      this.service.getById(deckId).subscribe({
        next: (resp) => {
          this.deckDetail.set(resp);
        }
      })
    }

  }

  navigateBack(){
    this.router.navigate(['deck-list'])
  }

  navigateToNew(){
    this.router.navigate(['card-new'])
  }

  navigateToDetail(id: number){
    this.router.navigate([`cards/${id}`]);
  }
}
