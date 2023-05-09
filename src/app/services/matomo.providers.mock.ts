import { importProvidersFrom } from '@angular/core'
import { NgxMatomoModule, NgxMatomoRouterModule } from 'ngx-matomo-client'

export const matomoProvidersMock = [
  importProvidersFrom(
    NgxMatomoModule.forRoot({
      siteId: 3,
      trackerUrl: 'https://analytics.apps.pawcode.de',
      disabled: true,
    })
  ),
  importProvidersFrom(NgxMatomoRouterModule.forRoot()),
]
