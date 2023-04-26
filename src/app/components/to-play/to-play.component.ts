import { Component, Input, OnInit } from '@angular/core'
import { SongToPlay } from '../../interfaces/SongToPlay'

@Component({
  selector: 'app-to-play',
  templateUrl: './to-play.component.html',
})
export class ToPlayComponent {
  @Input()
  songs: SongToPlay[]

  song: SongToPlay = { title: 'Start random generator' }

  selectRandomSong($event?: Event): void {
    $event?.preventDefault()

    if (!this.songs) {
      this.song = { title: 'No music packs loaded yet' }
      return
    }

    if (this.songs.length === 0) {
      this.song = { title: 'No song with current settings available' }
      return
    }

    this.song = this.songs[Math.floor(Math.random() * this.songs.length)]
  }
}
