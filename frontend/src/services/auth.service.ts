import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { LoginPostDto } from '../models/loginPostDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
      private readonly apiUrl = environment.apiUrl;

    private readonly http = inject(HttpClient)
    
    login(data: LoginPostDto) {
    return this.http.post(`${this.apiUrl}/auth`, data);
  }
}
