import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ReviewPostDto } from '../models/reviewPostDto';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
    private readonly apiUrl = environment.apiUrl;
    private readonly http = inject(HttpClient)

    save(entity: ReviewPostDto){
      return this.http.post(`${this.apiUrl}/reviews`, entity);
    }
}
