import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal, Signal, ViewChild, WritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { sign } from 'crypto';
import { CardGetDto } from '../../models/cardGetDto';
import { QuillEditorComponent, QuillModule } from 'ngx-quill';
import { TuiButton, TuiIcon, TuiLink, TuiTextfield } from '@taiga-ui/core';
import { firstValueFrom } from 'rxjs';
import { DeckService } from '../../services/deck.service';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-card-detail',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, QuillModule, TuiTextfield, TuiLink, TuiButton, TuiIcon],
  templateUrl: './card-detail.html',
  styleUrl: './card-detail.css',
})
export class CardDetail implements OnInit {
  
    @ViewChild(QuillEditorComponent, { static: false })
  quillComp?: QuillEditorComponent;

  route = inject(ActivatedRoute);
  service = inject(CardService);
  router = inject(Router);
    userService= inject(UserService);
  decksService = inject(DeckService);
  cardsService = inject(CardService);
  toastService = inject(ToastService);

  isEditing: WritableSignal<boolean> = signal(false);
  card: WritableSignal<CardGetDto | null> = signal(null);
  loggedUserId: WritableSignal<number | null> = signal(null);

  constructor(private fileService:FileService){

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
      const cardId = Number(id);
      this.service.getById(cardId).subscribe({
        next: (resp) => {
          this.card.set(resp);
          console.log(this.card())
        }, 
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

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
    getLoggedUser(){
    this.userService.getMe().subscribe({
      next: (resp) => {
        this.loggedUserId.set(resp.id!);
      }, 
      error: (err) => {
        console.error(err);
      }
    });
  }

  private async uploadImage(file: File): Promise<string> {
    const form = new FormData();
    form.append('file', file);  
  
    const resp: any = await firstValueFrom(
      this.fileService.uploadFile(form)
    );
  
    return `http://localhost:3000/uploads/${resp.fileName}`;
  }
  

  navigateBack(){
    this.router.navigate([`decks/${this.card()?.deckId}`])
  }
  toggleEdit(){
    this.isEditing.set(!this.isEditing());
  }

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

  
}
