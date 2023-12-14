import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './store/reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimations(),
    importProvidersFrom(
      StoreModule.forRoot({todoState: todoReducer})
    )
  ]
};
