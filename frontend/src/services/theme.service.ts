import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  
    public selectedTheme: string = 'light';

    toggleTheme(){
        if (this.selectedTheme == 'dark'){
            this.selectedTheme = 'light'
        }
        else this.selectedTheme = 'dark'
    }
}
