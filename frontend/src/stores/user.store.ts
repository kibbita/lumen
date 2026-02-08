import { Injectable, signal, inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { UserGetDto } from '../models/userGetDto';
import { UserPostDto } from '../models/userPostDto';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private userService = inject(UserService);

  // 🔹 estado
  loading = signal(false);
  error = signal<string | null>(null);
  user = signal<UserGetDto | null>(null);

  register(dto: UserPostDto) {
    this.loading.set(true);
    this.error.set(null);

    return this.userService.register(dto).pipe(
      finalize(() => this.loading.set(false))
    );
  }

  setUser(user: UserGetDto) {
    this.user.set(user);
  }

  clear() {
    this.user.set(null);
  }
}