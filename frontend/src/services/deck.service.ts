import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DeckPostDto } from '../models/deckPostDto';
import { Observable } from 'rxjs';
import { DeckGetDto } from '../models/deckGetDto';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
    private readonly apiUrl = environment.apiUrl;
    private readonly http = inject(HttpClient);


    save(data: DeckPostDto) {
    return this.http.post(`${this.apiUrl}/decks`, data);
  }

    getMine(userId: number) : Observable<DeckGetDto[]>{
      return this.http.get<DeckGetDto[]>(`${this.apiUrl}/decks`, 
        {params: {
          userId
      }});
    }
}
