import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
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

  // @ts-ignore
  private activeSet?: boolean[]

  @ViewChild('scrollContainer')
  private readonly scrollContainer: ElementRef
  @ViewChild('scrollContent')
  private readonly scrollContent: ElementRef

  @Output()
  private readonly onCloseSongSelection = new EventEmitter<Pack | undefined>()

  ngOnChanges(): void {
    this.pack.set(this.packInput)
  }

  ngAfterViewInit(): void {
    const outerHeight = this.scrollContainer.nativeElement.clientHeight
    const innerHeight = this.scrollContent.nativeElement.clientHeight

    if (innerHeight > outerHeight)
      this.scrollContainer?.nativeElement.classList.add('pr-4')

    this.activeSet = this.packInput.songs.map(song => song.active)
  }

  protected select(song: Song): void {
    this.pack.mutate(_pack => {
      song.active = !song.active
    })
  }

  protected selectAll(): void {
    this.pack.mutate(pack => {
      pack.songs.forEach(song => song.active = !this.allActive())
    })
  }

  protected closeSongSelector() {
    if (this.activeSet?.some((active, index) => active !== this.pack().songs[index].active))
      this.onCloseSongSelection.emit(this.pack())
    else
      this.onCloseSongSelection.emit()
  }

}
