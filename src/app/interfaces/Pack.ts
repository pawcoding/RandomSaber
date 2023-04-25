import { Song } from './Song'

export interface Pack {
  id: string
  title: string
  type: 'OST' | 'ADDON' | 'CUSTOM'
  img: string
  songs: Song[]
}
