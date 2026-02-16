import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FileService {
    private readonly apiUrl = environment.apiUrl;

    private readonly http = inject(HttpClient)

    uploadFile(data: FormData) : any {
        return this.http.post(`${this.apiUrl}/file-upload/upload`, data);
      }
}
