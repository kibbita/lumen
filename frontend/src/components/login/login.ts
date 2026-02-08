import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiButton, TuiTextfield, TuiLabel } from '@taiga-ui/core';
import { KeyRound, LucideAngularModule, Mail } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, TuiButton, FormsModule, TuiTextfield, TuiLabel, LucideAngularModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    //Icons setup
    readonly mail = Mail;
    readonly keyround = KeyRound;

    //injections
    private router= inject(Router);
    private formBuilder = inject(FormBuilder);
    private authService = inject(AuthService);
    private toastsService = inject(ToastService)

    //Variables
    loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    navigateToRegister(){
      this.router.navigateByUrl('/register');
    }

    submitForm(){
      if (this.loginForm.invalid) return;
      this.authService.login({
        password: this.loginForm.get('password')?.value!,
        username: this.loginForm.get('username')?.value!
      }).subscribe({
        next: (res: any) => {
          localStorage.setItem('access_token', res.access_token);
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          this.toastsService.showError('Incorrect e-mail or password')
        }
      })
    }
}
