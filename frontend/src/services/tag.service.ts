import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { TagPostDto } from '../models/tagPostDto';
import { filter, Observable } from 'rxjs';
import { TagGetDto } from '../models/tagGetDto';
import { TagFilterDto } from '../models/filters/tagFilterDto';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient)


  save(entityToAdd: TagPostDto) : Observable<TagGetDto> {
    return this.http.post<TagGetDto>(`${this.apiUrl}/tags`, entityToAdd);
  }

  getByFilters(filters: TagFilterDto) : Observable<TagGetDto[]> {
    return this.http.get<TagGetDto[]>(`${this.apiUrl}/tags`,{
      params: {...filters}
    });
  }

  delete(id: number) : Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/tags/${id}`);
  }
  
}
