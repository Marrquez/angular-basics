import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './store/reducer';
import { ApiMockService } from './services/api-mock.service';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    ApiMockService,
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimations(),
    importProvidersFrom(
      StoreModule.forRoot({todoState: todoReducer}),
      HttpClientModule
    )
  ]
};
