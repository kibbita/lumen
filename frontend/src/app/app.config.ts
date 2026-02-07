import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideEventPlugins} from '@taiga-ui/event-plugins';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideEventPlugins(),
    provideAnimations(),
    provideRouter(appRoutes),
  ],
};
