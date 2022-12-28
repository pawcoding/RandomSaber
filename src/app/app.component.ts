import {Component} from '@angular/core';
import {Difficulty} from "./enums/Difficulty";
import {Mode} from "./enums/Mode";
import {KeyValue} from "@angular/common";
import {PackLoaderService} from "./services/pack-loader.service";
import {Song} from "./interfaces/Song";
import {iswitch} from "iswitch";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  readonly Mode = Mode

  readonly Difficulty = Difficulty

  title = 'random-saber'

  difficulty = Difficulty.EXPERT

  mode = Mode.TWO_SABERS

  originalOrder = (a: KeyValue<any, string>, b: KeyValue<any, string>) => 0

  songs: { pack: string, title: string }[] = []

  refreshCooldown?: NodeJS.Timeout


  constructor(
    private packLoaderService: PackLoaderService
  ) {
    packLoaderService.changeEmitter.subscribe(_ => {
      clearTimeout(this.refreshCooldown)
      this.refreshCooldown = setTimeout(() => {
        this.refreshPlayableSongs()
      }, 500)
    })
  }

  refreshPlayableSongs(): void {
    console.time('🎛️')

    const difficultyNumber = iswitch(this.difficulty,
      [Difficulty.EASY, () => 1],
      [Difficulty.NORMAL, () => 10],
      [Difficulty.HARD, () => 100],
      [Difficulty.EXPERT, () => 1000],
      [Difficulty.PRO, () => 10000]
    ) || 1

    this.songs = this.packLoaderService.packs
      .map(pack => (
        pack.songs
          .filter(song => this.isPlayable(song, difficultyNumber))
          .map(song => ({ pack: pack.title, title: song.title }))
        )
      )
      .filter(arr => arr.length > 0)
      .flat()

    console.timeEnd('🎛️')
  }

  private isPlayable(song: Song, difficultyNumber: number): boolean {
    const modeNumber = iswitch(this.mode,
      [Mode.TWO_SABERS, () => song.modes.twoSabers],
      [Mode.ONE_SABER, () => song.modes.oneSaber],
      [Mode.NO_ARROWS, () => song.modes.noArrows],
      [Mode.FULL, () => song.modes.full],
      [Mode.QUARTER, () => song.modes.quarter]
    ) || 0

    return song.active && (modeNumber / difficultyNumber) % 10 >= 1
  }

  changeDifficulty(difficulty: Difficulty) {
    this.difficulty = difficulty
    this.refreshPlayableSongs()
  }

  changeMode(mode: Mode) {
    this.mode = mode
    this.refreshPlayableSongs()
  }

}
