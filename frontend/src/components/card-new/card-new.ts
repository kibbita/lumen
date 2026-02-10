import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { QuillModule, QuillEditorComponent } from 'ngx-quill';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-new',
  standalone: true,
  imports: [CommonModule, QuillModule, FormsModule],
  templateUrl: './card-new.html',
  styleUrls: ['./card-new.css'],
})
export class CardNew {
  @ViewChild(QuillEditorComponent, { static: false })
  quillComp?: QuillEditorComponent;

  html = 'THIS IS THE BACK OF THE CARD<br>this is an image<br><img src="http://localhost:3000/uploads/99ad6a5e-dcb9-49e7-ac62-d7e0fea3fa3f.jpg">' as any;

  // Toolbar + handler custom para imagen
  modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ header: [1, 2, 3, false] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: () => this.selectAndUploadImage(),
      },
    },
  };

  constructor(private http: HttpClient) {}

  private get quill() {
    // ngx-quill expone la instancia real en `quillEditor`
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

    // Ajusta el endpoint a tu backend
    const res = await this.http
      .post<{ url: string }>('http://localhost:3000/file-upload/upload', form)
      .toPromise();

    if (!res?.url) throw new Error('Upload failed: missing url');
    return res.url; // esto termina como <img src="...">
  }
}
