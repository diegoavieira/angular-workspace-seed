import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme } from './theme';
import { environment } from '@enviroment';

const THEME_KEY = 'THEME_KEY';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly apiUrl = environment.API_URL;

  private themeSubject$ = new BehaviorSubject<Theme>(this.getStorage());
  private defaultTheme: Theme;

  constructor() {
    this.defaultTheme = {
      name: 'default_theme',
      primary: '#696969',
      accent: '#708090',
      background: '#DCDCDC',
      text: '#696969'
    };

    if (this.hasTheme()) {
      this.notifyThemeSubject();
    } else {
      this.themeSubject$.next(this.defaultTheme);
    }
  }

  async setTheme(name: string) {
    try {
      await fetch(`${this.apiUrl}/themes/name/${name}`)
        .then((result) => result.json())
        .then((result) => {
          if (result.data) {
            this.setStorage(result.data);
          } else {
            this.resetThemeToDefault();
          }
        });
    } catch (error) {
      console.log('error', error);
    }
  }

  getTheme() {
    return this.themeSubject$.asObservable();
  }

  private hasTheme() {
    return !!this.getStorage();
  }

  private resetThemeToDefault() {
    localStorage.removeItem(THEME_KEY);
    this.themeSubject$.next(this.defaultTheme);
  }

  private setStorage(theme: Theme) {
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
    this.notifyThemeSubject();
  }

  private getStorage() {
    return JSON.parse(localStorage.getItem(THEME_KEY));
  }

  private notifyThemeSubject() {
    const theme = this.getStorage();
    this.themeSubject$.next(theme);
  }
}
