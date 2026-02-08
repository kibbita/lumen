import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule, TuiButton],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {}
