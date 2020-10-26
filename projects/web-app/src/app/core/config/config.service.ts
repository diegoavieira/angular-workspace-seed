import { Injectable, Injector } from '@angular/core';
import { KeycloakInstance } from 'keycloak-js';
import { environment } from '@enviroment';
import { Config } from './config';
import { Router } from '@angular/router';
import { ThemeService } from '../theme/theme.service';

declare let Keycloak: any;
const CONFIG_NAME_KEY = 'CONFIG_NAME_KEY';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  readonly apiUrl = environment.API_URL;

  config: Config;
  keycloak: KeycloakInstance;

  constructor(private injector: Injector) {}

  async init() {
    const router = this.injector.get(Router);
    const themeService = this.injector.get(ThemeService);
    const configName = window.location.pathname.split('/')[1] || 'adsystem';
    const configNameStorage = localStorage.getItem(CONFIG_NAME_KEY);
    const logoutSession = configNameStorage && configNameStorage !== configName;

    if (logoutSession) {
      await this.getParent(configNameStorage).then(async (result) => {
        const { data } = result;
        const redirectUri = window.location.href;
        const urlLogout = `${data.auth_url}/realms/${data.realm}/protocol/openid-connect/logout?redirect_uri=${redirectUri}`;

        localStorage.setItem(CONFIG_NAME_KEY, configName);

        window.location.href = urlLogout;
      });
    }

    await this.getParent(configName).then(async (result) => {
      if (result.data) {
        this.config = result.data;

        await themeService.setTheme(this.config.theme);
        await this.setKeycloak(this.config);

        localStorage.setItem(CONFIG_NAME_KEY, configName);
      } else {
        router.navigate(['parent-not-found']);
        localStorage.removeItem(CONFIG_NAME_KEY);
      }
    });
  }

  private async getParent(name: string) {
    try {
      return await fetch(`${this.apiUrl}/parents/name/${name}`).then((result) => result.json());
    } catch (error) {
      console.log('error', error);
    }
  }

  private async setKeycloak(config: Config) {
    this.keycloak = new Keycloak({
      url: config.auth_url,
      realm: config.realm,
      clientId: config.client_id
    });

    await this.keycloak.init({
      onLoad: 'login-required'
    });
  }
}
