import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-to-play',
  templateUrl: './to-play.component.html'
})
export class ToPlayComponent implements OnInit {

  @Input()
  songs?: { pack: string, title: string }[]

  song: { pack?: string, title: string }

  tries = 0

  constructor() {
    this.song = {
      title: 'Start random generator',
    }
  }

  ngOnInit(): void {
  }


  selectRandomSong($event?: Event): void {
    $event?.preventDefault()

    if (!this.songs) {
      this.song = {
        title: 'Waiting for music packs'
      }

      if (this.tries++ < 3) {
        setTimeout(() => {
          this.selectRandomSong()
        }, 3000)
      }

      return
    }

    if (this.songs.length === 0) {
      this.song = {
        title: 'No song with current settings available'
      }
      return
    }

    this.song = this.songs[Math.floor(Math.random() * this.songs.length)]
    this.tries = 0
  }

}
