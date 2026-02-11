import { Component, inject } from '@angular/core';
import { TuiIcon, TuiRoot } from '@taiga-ui/core';
import { LucideAngularModule, Moon, Route, Sun } from 'lucide-angular';
import {TuiNavigation,} from '@taiga-ui/layout';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';import {TuiAvatar, TuiBadge, TuiBadgeNotification, TuiSwitch} from '@taiga-ui/kit';
import { ThemeService } from '../../../services/theme.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-app-layout',
  imports: [RouterLink, RouterOutlet,
     TuiRoot, FormsModule, LucideAngularModule, TuiNavigation, TuiBadge, TuiIcon, TuiSwitch , TuiAvatar,],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.css',
})
export class AppLayout {
  drawerOpen = true;
  settingsOpen = false;
  selected: any = null;

  //icons
  readonly moon = Moon;
  readonly sun = Sun;


  themeService = inject(ThemeService);

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  toggleTheme(){
    this.themeService.toggleTheme();
  }
}
