import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Scroll to top - Navbar sections changes: 
const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};
const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, inMemoryScrollingFeature, withPreloading(PreloadAllModules)),
    provideClientHydration(), // SSR (Server Side Rendering)
    importProvidersFrom(HttpClientModule,BrowserAnimationsModule),
    { provide: LocationStrategy, useClass: HashLocationStrategy }, // Add # to URL -  Enable Location Strategy
  ]
};
