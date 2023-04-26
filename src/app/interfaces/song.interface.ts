export interface Song {
  number: number
  title: string
  active: boolean
  modes: {
    twoSabers: number
    oneSaber: number
    noArrows: number
    full: number
    quarter: number
  }
}

export const TEST_SONG: Song = {
  number: 1,
  title: 'Test Song',
  active: true,
  modes: {
    twoSabers: 11111,
    oneSaber: 11111,
    noArrows: 11000,
    full: 11,
    quarter: 11010,
  },
}
