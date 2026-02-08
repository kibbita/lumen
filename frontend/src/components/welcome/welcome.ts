import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TuiTime } from '@taiga-ui/cdk/date-time';
import { TuiButton, TuiRoot, TuiTitle } from '@taiga-ui/core';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule, TuiRoot, TuiButton, TuiTitle,],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {}
