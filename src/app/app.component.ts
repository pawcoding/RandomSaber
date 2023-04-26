import { Component, computed, inject } from '@angular/core'
import { Difficulty } from './enums/Difficulty'
import { Mode } from './enums/Mode'
import { environment } from '../environments/environment'
import { MatomoTracker } from '@ngx-matomo/tracker'
import { Pack } from './interfaces/pack.interface'
import { SongService } from './services/song.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  version = environment.version

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

  constructor() {
    this.tracker.setConsentGiven()
    this.tracker.trackPageView()
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
}
