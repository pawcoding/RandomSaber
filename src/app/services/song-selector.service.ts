import {EventEmitter, Injectable} from '@angular/core';
import {Pack} from "../interfaces/Pack";

@Injectable({
  providedIn: 'root'
})
export class SongSelectorService {

  public packToOpen: EventEmitter<Pack | null>

  public changeEvent: EventEmitter<undefined>

  constructor() {
    this.packToOpen = new EventEmitter<Pack | null>()
    this.changeEvent = new EventEmitter<undefined>()
  }

  openPack(pack: Pack) {
    this.packToOpen.emit(pack)
  }

  closePack() {
    this.packToOpen.emit(null)
  }

  triggerChangeEvent() {
    this.changeEvent.emit()
  }

}
