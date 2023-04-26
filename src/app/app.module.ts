import { isDevMode, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { ToPlayComponent } from './components/to-play/to-play.component'
import { MusicPacksComponent } from './components/music-packs/music-packs.component'
import { PackComponent } from './components/pack/pack.component'
import { HttpClientModule } from '@angular/common/http'
import { SongSelectorComponent } from './components/song-selector/song-selector.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ServiceWorkerModule } from '@angular/service-worker'
import { MatomoConsentMode, NgxMatomoTrackerModule } from '@ngx-matomo/tracker'
import { environment } from '../environments/environment'
import { NgxMatomoRouterModule } from '@ngx-matomo/router'
import { AnalyticsInterceptor } from './interceptors/analytics.interceptor'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { StopPropagationDirective } from './directives/stop-propagation.directive'
import { PreventDefaultDirective } from './directives/contextmenu-prevent-default.directive'

@NgModule({
  declarations: [
    AppComponent,
    ToPlayComponent,
    MusicPacksComponent,
    PackComponent,
    SongSelectorComponent,
    StopPropagationDirective,
    PreventDefaultDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    NgxMatomoTrackerModule.forRoot({
      siteId: 3,
      trackerUrl: 'https://analytics.apps.pawcode.de/',
      enableJSErrorTracking: true,
      acceptDoNotTrack: true,
      requireConsent: MatomoConsentMode.TRACKING,
      disabled: !environment.production,
    }),
    NgxMatomoRouterModule.forRoot({
      interceptors: [AnalyticsInterceptor],
      trackPageTitle: false,
    }),
    NgOptimizedImage,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
