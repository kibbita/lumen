import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StudySessionPostDto } from '../models/studySessionPostDto';
import { StudySessionGetDto } from '../models/studySessionGetDto';
import { StudySessionFilterDto } from '../models/filters/studySessionFilterDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudySessionService {
    private readonly apiUrl = environment.apiUrl;
    private readonly http = inject(HttpClient)

    save(entity: StudySessionPostDto){
      return this.http.post(`${this.apiUrl}/study-sessions`, entity);
    }

    get(filters: StudySessionFilterDto) : Observable<StudySessionGetDto[]>{
      return this.http.get<StudySessionGetDto[]>(`${this.apiUrl}/study-sessions`, 
        {params: {...filters}
      });
    }
}
