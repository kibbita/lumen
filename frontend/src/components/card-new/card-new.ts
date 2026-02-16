import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { QuillModule, QuillEditorComponent } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { TuiButtonGroup, TuiConnected, TuiStepper } from '@taiga-ui/kit';
import { TuiAppearance, TuiButton, TuiIcon, TuiTextfield } from '@taiga-ui/core';
@Component({
  selector: 'app-card-new',
  standalone: true,
  imports: [CommonModule, QuillModule, FormsModule, TuiStepper, TuiConnected, TuiIcon, TuiButtonGroup, TuiAppearance, TuiTextfield],
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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.activeIndex.set(0);
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

  private async uploadImage(file: File): Promise<string> {
    const form = new FormData();
    form.append('file', file);

    const res = await this.http
      .post<{ url: string }>('http://localhost:3000/file-upload/upload', form)
      .toPromise();

    if (!res?.url) throw new Error('Upload failed: missing url');
    return res.url; 
  }

  navigateLeft(){
    if (this.activeIndex() == 0) return;
    this.activeIndex.set(this.activeIndex()-1);
  }

  navigateRight(){
    if (this.activeIndex() == 3) return;
    this.activeIndex.set(this.activeIndex()+1);
  }
}
