import {
  AfterViewInit, Component, computed,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output, signal,
  ViewChild
} from '@angular/core';
import {Pack} from "../../interfaces/Pack";
import {Song} from "../../interfaces/Song";

@Component({
  selector: 'app-song-selector',
  templateUrl: './song-selector.component.html'
})
export class SongSelectorComponent implements OnChanges, AfterViewInit {
  @Input('pack')
  public packInput: Pack

  // @ts-ignore
  protected readonly pack = signal(this.packInput, {deep: true})
  protected readonly active = computed(() => this.pack().songs.filter(song => song.active).length)
  protected readonly allActive = computed(() => this.active() === this.pack().songs.length)

  @ViewChild('scrollContainer')
  private readonly scrollContainer: ElementRef
  @ViewChild('scrollContent')
  private readonly scrollContent: ElementRef

  @Output()
  private readonly onSelect = new EventEmitter<Song>()
  @Output()
  private readonly onSelectAll = new EventEmitter<Song[]>()
  @Output()
  private readonly onCloseSongSelection = new EventEmitter<Pack>()

  ngOnChanges(): void {
    this.pack.set(this.packInput)
  }

  ngAfterViewInit(): void {
    const outerHeight = this.scrollContainer.nativeElement.clientHeight
    const innerHeight = this.scrollContent.nativeElement.clientHeight

    if (innerHeight > outerHeight)
      this.scrollContainer?.nativeElement.classList.add('pr-4')
  }

  toggleActive(song: Song): void {
    this.pack.mutate(pack => {
      const songToChange = pack.songs.find(s => s.number === song.number)
      if (songToChange)
        songToChange.active = !songToChange.active
    })
  }

  toggleAllActive(): void {
    const futureActiveState = !this.allActive()
    this.pack.mutate(pack => {
      pack.songs.forEach(song => song.active = futureActiveState)
    })
  }

  protected select(song: Song): void {
    this.onSelect.emit(song)
  }

  protected selectAll(): void {
    this.onSelectAll.emit(this.pack().songs)
  }

  protected closeSongSelector() {
    this.onCloseSongSelection.emit(this.pack())
  }

}
