import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Pack} from "../../interfaces/Pack";
import {Song} from "../../interfaces/Song";
import {SongSelectorService} from "../../services/song-selector.service";

@Component({
  selector: 'app-song-selector',
  templateUrl: './song-selector.component.html'
})
export class SongSelectorComponent implements OnInit, AfterViewInit {

  pack: Pack | null

  active: number = 0

  allActive = false

  @ViewChild('scrollContainer')
  public scrollContainer?: ElementRef

  @ViewChild('scrollContent')
  public scrollContent?: ElementRef


  constructor(
    private songSelectorService: SongSelectorService
  ) {
    this.pack = null

    this.songSelectorService.packToOpen.subscribe(pack => this.setPack(pack))
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const outerHeight = this.scrollContainer?.nativeElement.clientHeight
    const innerHeight = this.scrollContent?.nativeElement.clientHeight

    if (innerHeight > outerHeight)
      this.scrollContainer?.nativeElement.classList.add('pr-4')
  }


  private setPack(pack: Pack | null): void {
    this.pack = pack
    this.toggleActive()

    if (this.pack)
      setTimeout(() => this.ngAfterViewInit(), 10)
  }

  toggleActive(song?: Song, $event?: MouseEvent): void {
    $event?.stopPropagation()

    if (song)
      song.active = !song.active

    this.active = this.pack?.songs.filter(song => song.active).length || 0
    this.allActive = this.active === this.pack?.songs.length
    this.songSelectorService.triggerChangeEvent()
  }

  toggleAllActive(): void {
    if (this.active === this.pack?.songs.length)
      this.pack.songs.forEach(song => song.active = false)
    else
      this.pack?.songs.forEach(song => song.active = true)

    this.toggleActive()
  }

  closeSongSelector(): void {
    this.songSelectorService.closePack()
  }

}
