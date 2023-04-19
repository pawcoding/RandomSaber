import {Component, computed, effect, inject, Signal, signal} from '@angular/core';
import {Difficulty} from "./enums/Difficulty";
import {Mode} from "./enums/Mode";
import {KeyValue} from "@angular/common";
import {PackLoaderService} from "./services/pack-loader.service";
import {Song} from "./interfaces/Song";
import {iswitch} from "iswitch";
import {environment} from "../environments/environment";
import {MatomoTracker} from "@ngx-matomo/tracker";
import {Pack} from "./interfaces/Pack";
import {SongSelectorService} from "./services/song-selector.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private readonly packLoader = inject(PackLoaderService)
  private readonly songSelector = inject(SongSelectorService)
  private readonly tracker = inject(MatomoTracker)

  protected readonly Mode = Mode

  protected readonly Difficulty = Difficulty

  title = 'random-saber'

  version = environment.version

  difficulty = signal(Difficulty.EXPERT)

  mode = signal(Mode.TWO_SABERS)

  originalOrder = (a: KeyValue<any, string>, b: KeyValue<any, string>) => 0

  songs: { pack: string, img: string, title: string }[] = []

  refreshCooldown?: number

  packToChange?: Pack

  packs = this.packLoader.getPacks()

  packsLoaded = computed(() => this.packs().length > 0)


  constructor() {
    effect(() => {
      this.refreshPlayableSongs(this.packs(), this.difficulty(), this.mode())
    })

    // this.packLoader.changeEmitter.subscribe(_ => {
    //   clearTimeout(this.refreshCooldown)
    //   this.refreshCooldown = window.setTimeout(() => {
    //     this.refreshPlayableSongs()
    //   }, 500)
    // })

    this.tracker.setConsentGiven();

    this.songSelector.packToOpen.subscribe(pack => {
      this.packToChange = pack ?? undefined
    })
  }

  onSongSelectionClose(pack: Pack) {
    this.packToChange = undefined
    this.songSelector.closePack()
  }

  refreshPlayableSongs(packs: Pack[], difficulty: Difficulty, mode: Mode): void {
    console.time('🎛️')

    const difficultyNumber = iswitch(difficulty,
      [Difficulty.EASY, () => 1],
      [Difficulty.NORMAL, () => 10],
      [Difficulty.HARD, () => 100],
      [Difficulty.EXPERT, () => 1000],
      [Difficulty.PRO, () => 10000]
    ) || 1

    this.songs = packs
      .map(pack => (
        pack.songs
          .filter(song => this.isPlayable(song, difficultyNumber, mode))
          .map(song => ({ pack: pack.title, img: pack.img, title: song.title }))
        )
      )
      .filter(arr => arr.length > 0)
      .flat()

    console.timeEnd('🎛️')
  }

  private isPlayable(song: Song, difficultyNumber: number, mode: Mode): boolean {
    if (!song.active)
      return false

    const modeNumber = iswitch(mode,
      [Mode.TWO_SABERS, () => song.modes.twoSabers],
      [Mode.ONE_SABER, () => song.modes.oneSaber],
      [Mode.NO_ARROWS, () => song.modes.noArrows],
      [Mode.FULL, () => song.modes.full],
      [Mode.QUARTER, () => song.modes.quarter]
    ) || 0

    return (modeNumber / difficultyNumber) % 10 >= 1
  }

  changeDifficulty(difficulty: Difficulty) {
    this.difficulty.set(difficulty)
  }

  changeMode(mode: Mode) {
    this.mode.set(mode)
  }

}
