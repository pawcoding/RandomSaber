import {Component, computed, EventEmitter, Input, OnChanges, OnInit, Output, signal} from '@angular/core';
import {Pack} from "../../interfaces/Pack";
import {Song} from "../../interfaces/Song";

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html'
})
export class PackComponent implements OnChanges {
  @Input()
  public pack: Pack

  protected readonly active = signal(0)
  protected readonly allActive = computed(() => this.active() === this.pack.songs.length)

  @Output()
  private readonly onSelectAll = new EventEmitter<Song[]>()
  @Output()
  private readonly onOpenSongSelection = new EventEmitter<Pack>()

  ngOnChanges(): void {
    this.active.set(this.pack.songs.filter(song => song.active).length)
  }

  protected openSongSelection(): void {
    this.onOpenSongSelection.emit(this.pack)
  }

  protected selectAll(): void {
    this.onSelectAll.emit(this.pack.songs)
  }

}
