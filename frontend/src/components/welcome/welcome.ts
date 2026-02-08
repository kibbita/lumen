import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule, TuiButton],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {

  private router = inject(Router)

     navigateTo(route: string){
      this.router.navigateByUrl(`/${route}`);
    }


}
