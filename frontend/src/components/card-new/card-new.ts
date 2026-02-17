import { Component, computed, DestroyRef, inject, OnInit, Signal, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule, QuillEditorComponent } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonGroup, TuiCheckbox, TuiChevron, TuiComboBox, TuiConnected, TuiDataListWrapper, TuiFilterByInputPipe, TuiStepper, TuiTooltip } from '@taiga-ui/kit';
import { TuiAppearance, TuiButton, TuiDataList, TuiDialog, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { FileService } from '../../services/file.service';
import { firstValueFrom } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '../../services/user.service';
import { DeckService } from '../../services/deck.service';
import { CardService } from '../../services/card.service';
import { DeckGetDto } from '../../models/deckGetDto';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-card-new',
  standalone: true,
  imports: [CommonModule, 
    QuillModule,
    FormsModule,
    TuiStepper, 
    ReactiveFormsModule,
    TuiConnected, 
    TuiIcon, 
    TuiButtonGroup, 
    TuiAppearance,  
    TuiTextfield, 
    TuiDataList,
    TuiChevron,
    TuiComboBox,
    TuiButton,
    TuiDialog,
    TuiFilterByInputPipe,
    TuiDataListWrapper],
  templateUrl: './card-new.html',
  styleUrls: ['./card-new.css'],
})
export class CardNew implements OnInit {
  @ViewChild(QuillEditorComponent, { static: false })
  quillComp?: QuillEditorComponent;

  backhtml = '' as any;
  fronthtml = '' as any;
  nameValue = '';
  open = signal(false);
  activeIndex = signal<number>(0);
  loggedUserId = signal<number|null>(null);
  decks = signal<DeckGetDto[]>([]);
  readonly deckSearch = signal('');
  readonly selectedDeck = signal<DeckGetDto|null>(null);
  readonly stringify = (deck: DeckGetDto) => deck.name ?? '';
  protected modalOpen = false;
  protected newDeckName = signal('');
  protected savingDeck = signal<boolean>(false);
  protected savingCard = signal<boolean>(false);

  userService= inject(UserService);
  decksService = inject(DeckService);
  cardsService = inject(CardService);
  toastService = inject(ToastService);
  private destroyRef = inject(DestroyRef);

  constructor(private fileService:FileService) {}

  ngOnInit(): void {
    this.activeIndex.set(0);
    this.getUserAndDecks();
  }

  protected showDialog(): void {
	        this.modalOpen = true;
	    }

  // Toolbar + handler custom para imagen
  modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ header: [1, 2, 3, false] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }], // 🎨 color de texto y fondo
        ['blockquote', 'code-block'],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: () => this.selectAndUploadImage(),
      },
    },
  };


  private get quill() {
    return this.quillComp?.quillEditor;
  }

  private selectAndUploadImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const imageUrl = await this.uploadImage(file);

      const q = this.quill;
      if (!q) return;

      const range = q.getSelection(true) ?? { index: q.getLength(), length: 0 };
      q.insertEmbed(range.index, 'image', imageUrl, 'user');
      q.setSelection(range.index + 1, 0, 'silent');
    };

    input.click();
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
    this.decksService.getMine(this.loggedUserId()!).subscribe({
      next: (resp) => {
        this.decks.set(resp);
        console.log(this.decks());
      },
       error: (err) => {
          console.error(err);
      }
    })

  }

private async uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file);

  const resp: any = await firstValueFrom(
    this.fileService.uploadFile(form)
  );

  return `http://localhost:3000/uploads/${resp.fileName}`;
}

  navigateLeft(){
    if (this.activeIndex() == 0) return;
    this.activeIndex.set(this.activeIndex()-1);
  }

  navigateRight(){
    if (this.activeIndex() == 3) return;
    this.activeIndex.set(this.activeIndex()+1);
  }

  saveDeck(){

    if (this.newDeckName() == '') return;
    this.savingDeck.set(true);

    this.decksService.save({name: this.newDeckName()})
    .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: resp => this.selectedDeck.set(resp as DeckGetDto),
      error: err => this.toastService.showError(err),
      complete: () => {
        this.savingDeck.set(false)
        this.modalOpen = false;
        this.getDecks();
        this.toastService.showSuccess('Deck created successfully')
      }
    });

  }

}
