import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Theme } from './theme';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@enviroment';

const THEME_KEY = 'THEME_KEY';
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly apiUrl = environment.API_URL;

  private themeSubject$ = new BehaviorSubject<Theme>(this.getStorage());
  private defaultTheme: Theme;

  constructor(private http: HttpClient) {
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

  setTheme(themeName: string): Observable<Theme> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('name', themeName);

    return this.http
      .get<any>(`${this.apiUrl}/themes`, { headers, params })
      .pipe(
        map((res) => {
          if (res.data.length === 1) {
            const theme = res.data[0];

            this.setStorage(theme);

            return theme;
          } else {
            this.resetThemeToDefault();
          }
        })
      );
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
