import {
  Component,
  computed,
  DoCheck,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core'
import { Pack, TEST_PACK } from '../../interfaces/pack.interface'

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html',
})
export class PackComponent implements DoCheck {
  @Input()
  public pack = TEST_PACK

  protected readonly active = signal(0)
  protected readonly allActive = computed(
    () => this.active() === this.pack.songs.length
  )

  @Output()
  private readonly selectAll = new EventEmitter<Pack>()
  @Output()
  private readonly openSongSelection = new EventEmitter<Pack>()

  ngDoCheck(): void {
    this.active.set(this.pack.songs.filter((song) => song.active).length)
  }

  protected onOpenSongSelection(): void {
    this.openSongSelection.emit(this.pack)
  }

  protected onSelectAll(): void {
    this.pack.songs.forEach((song) => (song.active = !this.allActive()))
    this.ngDoCheck()
    this.selectAll.emit(this.pack)
  }
}
