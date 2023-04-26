import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { environment } from '../environments/environment'
import { SongServiceMock } from './services/song.service.mock'
import { SongService } from './services/song.service'
import { matomoProvidersMock } from './services/matomo.providers.mock'
import { ToPlayComponent } from './components/to-play/to-play.component'
import { MusicPacksComponent } from './components/music-packs/music-packs.component'
import { FormsModule } from '@angular/forms'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, ToPlayComponent, MusicPacksComponent],
      providers: [
        {
          provide: SongService,
          useClass: SongServiceMock,
        },
        ...matomoProvidersMock,
      ],
      imports: [FormsModule],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have current version`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.version).toEqual(environment.version)
  })

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('h1')?.textContent).toMatch(/Random.*Saber/gm)
  })

  it('should have links to github and pawcode', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelectorAll('a').length).toBeGreaterThanOrEqual(2)
    expect(
      compiled.querySelector(
        'a[href="https://github.com/pawcoding/randomsaber"]'
      )
    ).toBeTruthy()
    expect(compiled.querySelector('a[href="https://pawcode.de/"]')).toBeTruthy()
  })
})
