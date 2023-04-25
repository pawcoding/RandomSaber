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
