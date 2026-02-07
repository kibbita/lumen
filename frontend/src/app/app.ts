import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiRoot, TuiButton } from '@taiga-ui/core';
@Component({
  imports: [RouterModule, TuiRoot, TuiButton],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'frontend';
}
