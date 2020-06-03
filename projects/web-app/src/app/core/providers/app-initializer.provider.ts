import { APP_INITIALIZER } from '@angular/core';
import { ConfigService } from '../config/config.service';

export const AppInitializerProvider = {
  provide: APP_INITIALIZER,
  deps: [ConfigService],
  multi: true,
  useFactory: (configService: ConfigService) => {
    return () => configService.init();
  }
};
