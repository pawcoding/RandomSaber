export interface SongToPlay {
  pack?: string
  img?: string
  title: string
}

export const TEST_SONG_TO_PLAY: SongToPlay = {
  title: 'Test song to play',
  pack: 'Testpack',
  img: '/assets/icons/icon-512x512.png',
}
