import { inject, Injectable } from '@angular/core'
import { MatomoRouterInterceptor } from '@ngx-matomo/router'
import { MatomoTracker } from '@ngx-matomo/tracker'
import { NavigationEnd } from '@angular/router'
import { Observable } from 'rxjs'

@Injectable()
export class AnalyticsInterceptor implements MatomoRouterInterceptor {
  private readonly tracker = inject(MatomoTracker)

  isPWA = false

  constructor() {
    // Check for installed PWA
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      // eslint-disable-next-line  @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.navigator.standalone
    ) {
      this.isPWA = true
    }

    window.addEventListener('appinstalled', () => {
      this.isPWA = true
      this.tracker.trackEvent('pwa', 'installed')
    })
  }

  beforePageTrack(
    event: NavigationEnd
  ): Observable<void> | Promise<void> | void {
    this.tracker.setDocumentTitle(event.url)

    this.tracker.setCustomDimension(1, this.isPWA ? 'pwa' : 'web')
  }
}
