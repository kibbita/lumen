import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiRoot, TuiButton, TuiAppearance } from '@taiga-ui/core';
import { LucideAngularModule } from 'lucide-angular';
@Component({
  imports: [RouterModule, TuiRoot, LucideAngularModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'frontend';
}
