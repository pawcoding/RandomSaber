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
  @Input()
  public packs: Pack[] = []

  protected readonly packsSignal = signal(this.packs)
  protected readonly osts = computed(() =>
    this.packsSignal().filter((pack) => pack.type === 'OST')
  )
  protected readonly addons = computed(() =>
    this.packsSignal().filter((pack) => pack.type === 'ADDON')
  )

  @Output()
  private readonly selectAll = new EventEmitter<Pack>()
  @Output()
  private readonly openSongSelection = new EventEmitter<Pack>()

  ngOnChanges(): void {
    this.packsSignal.set(this.packs)
  }

  protected onOpenSongSelection(pack: Pack): void {
    this.openSongSelection.emit(pack)
  }

  protected onSelectAll(pack: Pack): void {
    this.selectAll.emit(pack)
  }
}
