import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenHttpInterceptor } from './core/token-interceptor';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha'

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideHttpClient(withInterceptors([tokenHttpInterceptor])), importProvidersFrom( RecaptchaV3Module), {provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LfgX4EqAAAAAGZsoPTiXzq7oiFRV7V8QW4A15lg'}]
};
