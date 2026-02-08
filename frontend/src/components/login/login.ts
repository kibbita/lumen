import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiButton, TuiTextfield, TuiLabel } from '@taiga-ui/core';
import { KeyRound, LucideAngularModule, Mail } from 'lucide-angular';

@Component({
  selector: 'app-login',
  imports: [CommonModule, TuiButton, FormsModule, TuiTextfield, TuiLabel, LucideAngularModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    //Icons setup
    readonly mail = Mail;
    readonly keyround = KeyRound;

    private router= inject(Router);

    navigateToRegister(){
      this.router.navigateByUrl('/register');
    }
}
