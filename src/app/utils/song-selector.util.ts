import { Pack } from '../interfaces/Pack'
import { Mode } from '../enums/Mode'
import { Difficulty } from '../enums/Difficulty'
import { SongToPlay } from '../interfaces/SongToPlay'
import { Song } from '../interfaces/Song'

/**
 * Utility class retrieving songs that are playable with the given mode and difficulty.
 */
export class SongSelectorUtil {
  /**
   * Returns a list of songs that are playable with the given mode and difficulty.
   * @param packs List of packs to search through.
   * @param mode The mode to search for.
   * @param difficulty The difficulty to search for.
   */
  public static getPlayableSongs(
    packs: Pack[],
    mode: Mode,
    difficulty: Difficulty
  ): SongToPlay[] {
    const startHrTime = process.hrtime()

    const songs: SongToPlay[] = []
    const difficultyNumber = this._getDifficultyNumber(difficulty)

    packs.forEach((pack) => {
      pack.songs.forEach((song) => {
        if (this._isPlayable(song, difficultyNumber, mode))
          songs.push({
            pack: pack.title,
            img: pack.img,
            title: song.title,
          })
      })
    })

    const elapsedHrTime = process.hrtime(startHrTime)
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1000000
    console.log(
      `[SongSelector]\tCollected ${
        songs.length
      } songs with "${mode}" on "${difficulty}" in ${elapsedTimeInMs.toFixed(
        4
      )}ms.`
    )

    return songs
  }

  /**
   * Returns the specific number of the given difficulty needed for {@link _isPlayable} calculations.
   * @param difficulty The difficulty to get the number of.
   */
  private static _getDifficultyNumber(difficulty: Difficulty): number {
    switch (difficulty) {
      case Difficulty.EASY:
        return 1
      case Difficulty.NORMAL:
        return 10
      case Difficulty.HARD:
        return 100
      case Difficulty.PRO:
        return 10000
      default:
        return 1000
    }
  }

  /**
   * Returns whether the given song is playable with the given mode and difficulty.
   * @param song The song to check.
   * @param difficultyNumber The number of the difficulty to check.
   * @param mode The mode to check.
   */
  private static _isPlayable(
    song: Song,
    difficultyNumber: number,
    mode: Mode
  ): boolean {
    if (!song.active) return false

    let modeNumber = 0
    switch (mode) {
      case Mode.TWO_SABERS:
        modeNumber = song.modes.twoSabers
        break
      case Mode.ONE_SABER:
        modeNumber = song.modes.oneSaber
        break
      case Mode.NO_ARROWS:
        modeNumber = song.modes.noArrows
        break
      case Mode.FULL:
        modeNumber = song.modes.full
        break
      case Mode.QUARTER:
        modeNumber = song.modes.quarter
        break
      default:
        return false
    }

    return (modeNumber / difficultyNumber) % 10 >= 1
  }
}
