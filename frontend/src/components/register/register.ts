import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiValidationError } from '@taiga-ui/cdk/classes';
import { TuiButton, TuiError, TuiLabel, TuiLoader } from '@taiga-ui/core';
import { TuiTextfield} from '@taiga-ui/core';
import { KeyRound, LucideAngularModule, Mail, User} from 'lucide-angular';
import { UserService } from '../../services/user.service';
import { UserStore } from '../../stores/user.store';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-register',
  imports: [CommonModule, TuiButton, FormsModule, TuiTextfield, TuiLabel, LucideAngularModule, ReactiveFormsModule, TuiError, TuiLoader],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
    //Icons setup
    readonly mail = Mail;
    readonly keyround = KeyRound;
    readonly user = User;

    private router = inject(Router)
    private formbuilder = inject(FormBuilder)
    private toastsService = inject(ToastService)
    protected store = inject(UserStore);


    passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password')?.value;
        const repeat = control.get('repeatpassword')?.value;

        if (!password || !repeat) return null;

        return password === repeat ? null : { passwordsMismatch: true };
    }

    registerForm = this.formbuilder.group({
      email: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatpassword: ['', [Validators.required, Validators.minLength(8)]]
    },
    { validators: this.passwordsMatchValidator }
  )
    

    navigateToLogin(){
      this.router.navigateByUrl('/login');
    }
	 
  protected get passwordError(): TuiValidationError | null {
    const control = this.registerForm.get('password');

    if (!control || !control.touched || !control.errors) {
      return null;
    }

    if (control.errors['minlength']) {
      return new TuiValidationError('Password must be at least 8 characters');
    }

    return null;
  }

  protected get repeatPasswordError(): TuiValidationError | null {
    const control = this.registerForm.get('repeatpassword');

    if (!control || !control.touched) {
      return null;
    }

    if (control.errors?.['minlength']) {
      return new TuiValidationError('Password must be at least 8 characters');
    }

    if (this.registerForm.errors?.['passwordsMismatch']) {
      return new TuiValidationError('Password mismatch');
    }

    return null;
  }


  protected submitForm(){
    if (this.registerForm.invalid) return;

    const dto = {
      email: this.registerForm.get('email')?.value!,
      password: this.registerForm.get('password')?.value!,
      username: this.registerForm.get('username')?.value!
    }
    this.store.register(dto).subscribe({
    next: () => {
      this.toastsService.showSuccess('User created successfully')
      this.router.navigateByUrl('/login');
    },
    error: (err) => {
      console.log(err);
      this.store.error.set(err);
      this.toastsService.showError(`Error while creating the user: ${err.error.message}`)
    },
  })
};
     
}
