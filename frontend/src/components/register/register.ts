import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiButton, TuiLabel } from '@taiga-ui/core';
import { TuiTextfield} from '@taiga-ui/core';
import { KeyRound, LucideAngularModule, Mail} from 'lucide-angular';
@Component({
  selector: 'app-register',
  imports: [CommonModule, TuiButton, FormsModule, TuiTextfield, TuiLabel, LucideAngularModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
    //Icons setup
    readonly mail = Mail;
    readonly keyround = KeyRound;

    private router = inject(Router)
    navigateToLogin(){
      this.router.navigateByUrl('/login');
    }
}
