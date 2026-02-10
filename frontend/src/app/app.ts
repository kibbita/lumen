import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { TuiNavigation,} from '@taiga-ui/layout';
@Component({
  imports: [RouterModule, LucideAngularModule, TuiNavigation],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'Lumen';
}
