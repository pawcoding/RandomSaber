import { Song, TEST_SONG } from './Song'

export interface Pack {
  id: string
  title: string
  type: 'OST' | 'ADDON' | 'CUSTOM'
  img: string
  songs: Song[]
}

export const TEST_PACK: Pack = {
  id: 'test',
  title: 'Test Pack',
  type: 'CUSTOM',
  img: '/assets/icons/icon-512x512.png',
  songs: [TEST_SONG],
}
