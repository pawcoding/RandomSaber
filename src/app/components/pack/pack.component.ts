import {
  Component,
  computed,
  DoCheck,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core'
import { Pack, TEST_PACK } from '../../interfaces/Pack'

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
  private readonly onSelectAll = new EventEmitter<Pack>()
  @Output()
  private readonly onOpenSongSelection = new EventEmitter<Pack>()

  ngDoCheck(): void {
    this.active.set(this.pack.songs.filter((song) => song.active).length)
  }

  protected openSongSelection(): void {
    this.onOpenSongSelection.emit(this.pack)
  }

  protected selectAll(): void {
    this.pack.songs.forEach((song) => (song.active = !this.allActive()))
    this.ngDoCheck()
    this.onSelectAll.emit(this.pack)
  }
}
