import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TuiRoot, TuiButton, TuiAppearance } from '@taiga-ui/core';
import { LucideAngularModule } from 'lucide-angular';
import {
    TuiCardLarge,
    TuiHeader,
    tuiLayoutIconsProvider,
    TuiNavigation,
} from '@taiga-ui/layout';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-app-layout',
  imports: [RouterModule, TuiRoot, LucideAngularModule, TuiNavigation],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.css',
})
export class AppLayout {
    drawerOpen = true;
  settingsOpen = false;

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }
}
