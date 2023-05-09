import { Signal, signal } from '@angular/core'
import { Pack, TEST_PACK } from '../interfaces/pack.interface'
import { SongService } from './song.service'
import {
  SongToPlay,
  TEST_SONG_TO_PLAY,
} from '../interfaces/song-to-play.interface'
import { Mode } from '../enums/Mode'
import { Difficulty } from '../enums/Difficulty'

export class SongServiceMock implements Partial<SongService> {
  private readonly _mode = signal(Mode.TWO_SABERS)
  private readonly _difficulty = signal(Difficulty.EXPERT)
  public readonly packsAsArray = signal([TEST_PACK]).asReadonly()

  public mutatePack(pack: Pack): void {
    console.log(`SongServiceMock.mutatePack(${pack.id})`)
  }

  public get songsToPlay(): Signal<SongToPlay[]> {
    console.log('SongServiceMock.songsToPlay()')
    return signal([TEST_SONG_TO_PLAY]).asReadonly()
  }

  public get mode(): Signal<Mode> {
    console.log('SongServiceMock.mode()')
    return this._mode.asReadonly()
  }

  public get difficulty(): Signal<Difficulty> {
    console.log('SongServiceMock.difficulty()')
    return this._difficulty.asReadonly()
  }

  public setMode(mode: Mode): void {
    console.log(`SongServiceMock.setMode(${mode})`)
    this._mode.set(mode)
  }

  public setDifficulty(difficulty: Difficulty): void {
    console.log(`SongServiceMock.setDifficulty(${difficulty})`)
    this._difficulty.set(difficulty)
  }
}
