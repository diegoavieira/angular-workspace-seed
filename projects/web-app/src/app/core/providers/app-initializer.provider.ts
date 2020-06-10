import { APP_INITIALIZER } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const AppInitializerProvider = {
  provide: APP_INITIALIZER,
  deps: [AuthService],
  multi: true,
  useFactory: (authService: AuthService) => {
    return () => authService.init();
  }
};
