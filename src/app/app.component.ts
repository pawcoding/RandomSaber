import { Component, OnInit, computed, inject } from '@angular/core'
import { Difficulty } from './enums/Difficulty'
import { Mode } from './enums/Mode'
import { environment } from '../environments/environment'
import { Pack } from './interfaces/pack.interface'
import { SongService } from './services/song.service'
import { MatomoTracker } from 'ngx-matomo-client'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  version = environment.version
  showTrackingNotice = false

  // declare enums for template
  protected readonly Difficulty = Difficulty
  protected readonly Mode = Mode
  protected readonly keepOrder = () => 0

  // inject services
  private readonly _songService = inject(SongService)
  private readonly tracker = inject(MatomoTracker)

  // initiate signals
  protected readonly packs = this._songService.packsAsArray
  protected readonly packsLoaded = computed(() => this.packs().length > 0)
  protected readonly songsToPlay = this._songService.songsToPlay
  protected readonly mode = this._songService.mode
  protected readonly difficulty = this._songService.difficulty

  protected packToChange?: Pack

  ngOnInit(): void {
    // setup tracking
    switch (this.hasTrackingAllowed()) {
      case 1:
        // tracking is enabled
        this.tracker.setConsentGiven()
        break
      case 2:
        // tracking is not set
        this.showTrackingNotice = true
        break
      default:
        // tracking is disabled
        break
    }
  }

  /**
   * Open the song selection dialog
   * @param pack The pack to change
   */
  openSongSelection(pack: Pack) {
    this.packToChange = pack
  }

  /**
   * Close the song selection dialog.
   * If a pack is given (has changed), mutate the pack.
   * @param pack The pack to change
   */
  closeSongSelection(pack: Pack | undefined) {
    this.packToChange = undefined
    if (pack) this.mutatePack(pack)
  }

  /**
   * Change the difficulty
   * @param difficulty The new difficulty
   */
  changeDifficulty(difficulty: Difficulty) {
    this._songService.setDifficulty(difficulty)
  }

  /**
   * Change the mode
   * @param mode The new mode
   */
  changeMode(mode: Mode) {
    this._songService.setMode(mode)
  }

  /**
   * Mutate the pack
   * @param pack The pack to mutate
   */
  mutatePack(pack: Pack) {
    this._songService.mutatePack(pack)
  }

  /**
   * Allow tracking and remember the consent for 90 days
   */
  allowTracking() {
    this.showTrackingNotice = false
    this.rememberTracking(true)
    this.tracker.setConsentGiven()
  }

  /**
   * Disable tracking and remember the choice for 90 days
   */
  disableTracking() {
    this.showTrackingNotice = false
    this.rememberTracking(false)
    this.tracker.forgetConsentGiven()
  }

  /**
   * Check if the user has disabled tracking.
   * @returns {number} 0 = disabled, 1 = enabled, 2 = not set
   */
  private hasTrackingAllowed(): number {
    const item = localStorage.getItem('tracking')
    if (item) {
      try {
        const parsed = JSON.parse(item)
        if (parsed.expiry < Date.now()) {
          localStorage.removeItem('tracking')
          return 2
        } else {
          if (parsed.value) {
            this.rememberTracking(true)
          }

          return parsed.value ? 1 : 0
        }
      } catch (e) {
        console.error(e)
      }
    }
    return 2
  }

  /**
   * Remember if the user has enabled tracking for 90 days.
   * @param enabled
   */
  rememberTracking(enabled: boolean): void {
    const item = {
      value: enabled,
      expiry: Date.now() + 1000 * 60 * 60 * 24 * 90,
    }

    localStorage.setItem('tracking', JSON.stringify(item))
  }
}
