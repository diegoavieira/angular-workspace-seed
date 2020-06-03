import { APP_BASE_HREF } from '@angular/common';

export const AppBaseHrefProvider = {
  provide: APP_BASE_HREF,
  useFactory: () => {
    const path = window.location.pathname.split('/')[1] || 'adsystem';
    return `/${path}`;
  }
};
