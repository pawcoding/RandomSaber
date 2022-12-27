import {Component, Input, OnInit} from '@angular/core';
import {Pack} from "../../interfaces/Pack";
import {SongSelectorService} from "../../services/song-selector.service";

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html'
})
export class PackComponent implements OnInit {

  @Input()
  pack?: Pack

  active = 0

  constructor(
    private songSelectorService: SongSelectorService
  ) {
    songSelectorService.changeEvent.subscribe(_ => this.refreshActive())
  }

  ngOnInit(): void {
    this.refreshActive()
  }

  refreshActive() {
    this.active = this.pack?.songs.filter(song => song.active).length || 0
  }

  toggleAllActive($event: MouseEvent | undefined): void {
    $event?.preventDefault() || $event?.stopPropagation()

    if (this.active === this.pack?.songs.length)
      this.pack?.songs.forEach(song => song.active = false)
    else
      this.pack?.songs.forEach(song => song.active = true)

    this.refreshActive()
  }

  openSongSelection(pack: Pack) {
    this.songSelectorService.openPack(pack)
  }

}
