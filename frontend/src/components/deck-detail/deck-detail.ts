import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from '../../services/deck.service';
import { DeckDetailDto } from '../../models/deckDetailDto';
import { TuiCard } from '@taiga-ui/layout';
import {
  TuiAlertService,
  TuiAppearance,
  TuiAutoColorPipe,
  TuiButton,
  TuiDataList,
  TuiDialog,
  TuiDialogService,
  TuiIcon,
  TuiLink,
  TuiTextfieldComponent,
} from '@taiga-ui/core';
import {
  TUI_CONFIRM,
  TuiButtonClose,
  TuiButtonGroup,
  TuiChip,
  TuiConfirmData,
  TuiMultiSelect,
} from '@taiga-ui/kit';
import { TagService } from '../../services/tag.service';
import { TagPostDto } from '../../models/tagPostDto';
import { FormsModule } from '@angular/forms';
import { TagGetDto } from '../../models/tagGetDto';

@Component({
  selector: 'app-deck-detail',
  imports: [
    CommonModule,
    TuiCard,
    TuiIcon,
    TuiLink,
    TuiButtonGroup,
    TuiAppearance,
    TuiAutoColorPipe,
    TuiChip,
    TuiTextfieldComponent,
    TuiDataList,
    FormsModule,
    TuiDialog,
    TuiButton,
    TuiButtonClose,
  ],

  templateUrl: './deck-detail.html',
  styleUrl: './deck-detail.css',
})
export class DeckDetail implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  service = inject(DeckService);
  tagService = inject(TagService);
  dialogs = inject(TuiDialogService);
  alerts = inject(TuiAlertService);

  deckDetail: WritableSignal<DeckDetailDto | null> = signal(null);
  tagModalOpened: WritableSignal<boolean> = signal(false);

  readonly tagQuery = signal('');
  allTags = signal<TagGetDto[]>([]);

  readonly filteredTags = computed(() => {
  const query = this.tagQuery().toLowerCase();

  if (!query) return this.allTags();

  return this.allTags().filter(t =>
    t.name.toLowerCase().includes(query)
  );
});

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const deckId = Number(id);
      this.service.getById(deckId).subscribe({
        next: (resp) => {
          this.deckDetail.set(resp);
          this.tagService.getByFilters({}).subscribe((tags) => {
            this.allTags.set(tags);
          });
        },
      });
    }
  }

  navigateBack() {
    this.router.navigate(['deck-list']);
  }

  navigateToNew() {
    this.router.navigate(['card-new']);
  }

  navigateToDetail(id: number) {
    this.router.navigate([`cards/${id}`]);
  }

createTag() {
  const name = this.tagQuery()?.trim();
  if (!name) return;

  this.tagService
    .save({
      deckId: this.deckDetail()?.id,
      name: name,
    } as TagPostDto)
    .subscribe({
      next: () => {
        this.tagModalOpened.set(false);
        this.tagQuery.set('');
        this.reloadDeck();
      },
    });
}

selectExistingTag(tag: TagGetDto) {
  this.tagService
    .save({
      deckId: this.deckDetail()?.id,
      name: tag.name
    } as TagPostDto)
    .subscribe({
      next: () => {
        this.tagModalOpened.set(false);
        this.tagQuery.set('');
        this.reloadDeck();
      }
    });
}


reloadDeck(){
  this.service.getById(this.deckDetail()!.id).subscribe({
    next: (deck) => this.deckDetail.set(deck),
  });
}
  deleteTag(tagId: number) {
    this.tagService.delete(tagId).subscribe({
      next: (resp) => {
        if (this.deckDetail()?.id)
          this.reloadDeck();
      },
    });
  }

  confirmDeleteTag(tagId: number) {
    const data: TuiConfirmData = {
      content: 'Are you sure you want to delete this tag?',
      yes: 'Yes, delete',
      no: 'Cancel',
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Confirm Tag Deletion',
        size: 's',
        data,
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.deleteTag(tagId);
        }
      });
  }

  openTagModal() {
    this.tagModalOpened.set(true);
  }
}
