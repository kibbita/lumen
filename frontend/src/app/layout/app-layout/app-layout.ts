import { Component } from '@angular/core';
import { TuiIcon, TuiRoot } from '@taiga-ui/core';
import { LucideAngularModule } from 'lucide-angular';
import {TuiNavigation,} from '@taiga-ui/layout';
import { RouterModule } from '@angular/router';
import {TuiAvatar, TuiBadge, TuiBadgeNotification} from '@taiga-ui/kit';
@Component({
  selector: 'app-app-layout',
  imports: [RouterModule, TuiRoot, LucideAngularModule, TuiNavigation, TuiBadge, TuiIcon, TuiBadgeNotification, TuiAvatar],
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
