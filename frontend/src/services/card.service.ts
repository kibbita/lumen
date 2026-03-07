import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CardPostDto } from '../models/cardPostDto';
import { CardPutDto } from '../models/cardPutDto';
import { Observable } from 'rxjs';
import { CardGetDto } from '../models/cardGetDto';

@Injectable({
  providedIn: 'root',
})
export class CardService {

    private readonly apiUrl = environment.apiUrl;
    private readonly http = inject(HttpClient);

    save(entity: CardPostDto){
      return this.http.post(`${this.apiUrl}/cards`, entity);
    }

    getById(id: number) : Observable<CardGetDto>{
      return this.http.get<CardGetDto>(`${this.apiUrl}/cards/${id}`)
    }

    update(entityToUpdate: CardPutDto) : Observable<CardGetDto>{
      return this.http.put<CardGetDto>(`${this.apiUrl}/cards`, entityToUpdate);
    }
}
