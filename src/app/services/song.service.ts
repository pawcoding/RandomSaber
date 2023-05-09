import {
  computed,
  effect,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core'
import { Pack } from '../interfaces/pack.interface'
import { SongToPlay } from '../interfaces/song-to-play.interface'
import { PackLoaderUtil } from '../utils/pack-loader.util'
import { Mode } from '../enums/Mode'
import { Difficulty } from '../enums/Difficulty'
import { SongSelectorUtil } from '../utils/song-selector.util'

@Injectable({
  providedIn: 'root',
})
/**
 * The song service is responsible for storing packs and song selection for the application
 */
export class SongService {
  // initialize utils
  private readonly _packLoaderUtil = PackLoaderUtil.getPackLoader()

  // initialize signals
  private readonly _packs = signal<{ [id: string]: Pack }>({})
  private readonly _mode: WritableSignal<Mode>
  private readonly _difficulty: WritableSignal<Difficulty>

  // initialize computed signals
  public readonly packsAsArray = computed(() => Object.values(this._packs()))
  private readonly _songsToPlay = computed(() => {
    if (this.packsAsArray().length === 0) {
      return []
    }

    return SongSelectorUtil.getPlayableSongs(
      this.packsAsArray(),
      this._mode(),
      this._difficulty()
    )
  })

  /**
   * Initializes the song service by loading all packs
   */
  constructor() {
    const settings: { mode?: Mode; difficulty?: Difficulty } = JSON.parse(
      localStorage.getItem('rs_settings') ?? '{}'
    )
    if (settings.mode && settings.difficulty) {
      console.info(
        `[SongService]\tLoaded settings "${settings.mode}" on "${settings.difficulty}"`
      )
    }

    this._mode = signal(settings.mode ?? Mode.TWO_SABERS)
    this._difficulty = signal(settings.difficulty ?? Difficulty.EXPERT)

    this._packLoaderUtil.loadPacks().then(this._packs.set)

    effect(() => {
      const newSettings = {
        mode: this._mode(),
        difficulty: this._difficulty(),
      }
      if (
        newSettings.difficulty === settings.difficulty &&
        newSettings.mode === settings.mode
      )
        return

      console.info(
        `[SongService]\tSaving settings "${newSettings.mode}" on "${newSettings.difficulty}"`
      )
      localStorage.setItem('rs_settings', JSON.stringify(newSettings))
    })
  }

  /**
   * Mutates the pack in the packs signal and saves it to local storage
   * @param pack the pack to mutate
   */
  public mutatePack(pack: Pack): void {
    this._packs.mutate((packs) => (packs[pack.id] = pack))
    this._packLoaderUtil.safePackToLocalStorage(pack)
  }

  /**
   * Readonly signal of the packs playable with the current mode and difficulty
   */
  public get songsToPlay(): Signal<SongToPlay[]> {
    return this._songsToPlay
  }

  /**
   * Readonly signal of the current mode
   */
  public get mode(): Signal<Mode> {
    return this._mode.asReadonly()
  }

  /**
   * Readonly signal of the current difficulty
   */
  public get difficulty(): Signal<Difficulty> {
    return this._difficulty.asReadonly()
  }

  /**
   * Set the mode and refresh the list of songs to play
   * @param mode the mode to set
   */
  public setMode(mode: Mode): void {
    this._mode.set(mode)
  }

  /**
   * Set the difficulty and refresh the list of songs to play
   * @param difficulty the difficulty to set
   */
  public setDifficulty(difficulty: Difficulty): void {
    this._difficulty.set(difficulty)
  }
}
