import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { LoginPostDto } from '../models/loginPostDto';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserPostDto } from '../models/userPostDto';

@Injectable({
  providedIn: 'root',
})
export class UserService {

    private readonly apiUrl = environment.apiUrl;

    private readonly http = inject(HttpClient)
    
  register(data: UserPostDto) {
    return this.http.post(`${this.apiUrl}/users`, data);
  }
}
