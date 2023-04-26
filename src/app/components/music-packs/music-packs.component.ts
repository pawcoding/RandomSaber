import {
  Component,
  computed,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
} from '@angular/core'
import { Pack } from '../../interfaces/pack.interface'

@Component({
  selector: 'app-music-packs',
  templateUrl: './music-packs.component.html',
})
export class MusicPacksComponent implements OnChanges {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('packs')
  public packsInput: Pack[] = []

  protected readonly packs = signal(this.packsInput)
  protected readonly osts = computed(() =>
    this.packs().filter((pack) => pack.type === 'OST')
  )
  protected readonly addons = computed(() =>
    this.packs().filter((pack) => pack.type === 'ADDON')
  )

  @Output()
  private readonly selectAll = new EventEmitter<Pack>()
  @Output()
  private readonly openSongSelection = new EventEmitter<Pack>()

  ngOnChanges(): void {
    this.packs.set(this.packsInput)
  }

  protected onOpenSongSelection(pack: Pack): void {
    this.openSongSelection.emit(pack)
  }

  protected onSelectAll(pack: Pack): void {
    this.selectAll.emit(pack)
  }
}
