import {
  Component,
  computed,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
} from '@angular/core'
import { Pack } from '../../interfaces/Pack'

@Component({
  selector: 'app-music-packs',
  templateUrl: './music-packs.component.html',
})
export class MusicPacksComponent implements OnChanges {
  @Input('packs')
  public packsInput: Pack[]

  // @ts-ignore
  protected readonly packs = signal(this.packsInput ?? [])
  protected readonly osts = computed(() =>
    this.packs().filter((pack) => pack.type === 'OST')
  )
  protected readonly addons = computed(() =>
    this.packs().filter((pack) => pack.type === 'ADDON')
  )

  @Output()
  private readonly onSelectAll = new EventEmitter<Pack>()
  @Output()
  private readonly onOpenSongSelection = new EventEmitter<Pack>()

  ngOnChanges(): void {
    this.packs.set(this.packsInput)
  }

  protected openSongSelection(pack: Pack): void {
    this.onOpenSongSelection.emit(pack)
  }

  protected selectAll(pack: Pack): void {
    this.onSelectAll.emit(pack)
  }
}
