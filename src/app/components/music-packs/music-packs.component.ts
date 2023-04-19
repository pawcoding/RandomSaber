import {Component, computed, EventEmitter, Input, OnChanges, Output, signal} from '@angular/core';
import {Pack} from "../../interfaces/Pack";
import {Song} from "../../interfaces/Song";

@Component({
  selector: 'app-music-packs',
  templateUrl: './music-packs.component.html'
})
export class MusicPacksComponent implements OnChanges {
  @Input('packs')
  public packsInput: Pack[]

  // @ts-ignore
  protected readonly packs = signal(this.packsInput, {deep: true})
  protected readonly osts = computed(() => this.packs().filter(pack => pack.type === 'OST'))
  protected readonly addons = computed(() => this.packs().filter(pack => pack.type === 'ADDON'))

  @Output()
  private readonly onSelectAll = new EventEmitter<Song[]>()
  @Output()
  private readonly onOpenSongSelection = new EventEmitter<Pack>()

  ngOnChanges(): void {
    this.packs.set(this.packsInput)
  }

  toggleAllActive(songs: Song[]): void {
    console.log('toggleAllActive', songs)
    const active = songs.filter(song => song.active).length

    if (active === songs.length)
      songs.forEach(song => song.active = false)
    else
      songs.forEach(song => song.active = true)

    // this.songSelector.changeEvent.emit()
  }

  protected openSongSelection(pack: Pack): void {
    this.onOpenSongSelection.emit(pack)
  }

  protected selectAll(songs: Song[]): void {
    this.onSelectAll.emit(songs)
  }

}
