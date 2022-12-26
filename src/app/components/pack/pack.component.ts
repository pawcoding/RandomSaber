import {Component, Input, OnInit} from '@angular/core';
import {Pack} from "../../interfaces/Pack";

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html'
})
export class PackComponent implements OnInit {

  @Input()
  pack?: Pack

  active = 0

  constructor() { }

  ngOnInit(): void {
    this.refreshActive()
  }

  refreshActive() {
    this.active = this.pack?.songs.filter(song => song.active).length || 0
  }

  toggleAllActive($event: MouseEvent | undefined): void {
    $event?.preventDefault()

    if (this.active === this.pack?.songs.length)
      this.pack?.songs.forEach(song => song.active = false)
    else
      this.pack?.songs.forEach(song => song.active = true)

    this.refreshActive()
  }

}
