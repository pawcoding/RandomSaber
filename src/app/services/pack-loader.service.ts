import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pack} from "../interfaces/Pack";
import {catchError, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PackLoaderService {

  private dataUrl = 'https://raw.githubusercontent.com/pawcoding/RandomSaber/angular_setup/packs'

  private register = ''

  public packs: Pack[] = []

  public changeEmitter: EventEmitter<Pack>

  constructor(
    private http: HttpClient
  ) {
    this.changeEmitter = new EventEmitter<Pack>()
    this.changeEmitter.subscribe(pack => {
      this.savePack(pack)
    })

    this.fetchRegister()
  }

  fetchRegister() {
    return this.http.get<string>(`${this.dataUrl}/.register`, {responseType: 'text'} as Object)
      .pipe(
        catchError(_ => {
          return of(localStorage.getItem('register') || '')
        })
      )
      .subscribe(register => {
        this.register = register
        localStorage.setItem('register', this.register)

        register.split('\n')
          .forEach(packID => packID && this.fetchMusicPack(packID))
      })
  }

  fetchMusicPack(packID: string) {
    this.http.get<Pack>(`${this.dataUrl}/${packID}.json`)
      .pipe(
        catchError(_ => {
          return of(this.loadPackFromStorage(packID))
        })
      )
      .subscribe(pack => {
        pack.songs.forEach((song, index) => song.number = index)

        try {
          const saved = this.loadPackFromStorage(packID)

          console.log(saved)

          pack.songs.forEach(song => song.active = saved.songs.find(s => s.number === song.number)?.active || false)
        } catch (_) {
          if (pack.type === 'OST')
            pack.songs.forEach(song => song.active = true)
        }

        this.packs.push(pack)
        this.packs.sort((a, b) => this.register.indexOf(a.id) - this.register.indexOf(b.id))
        this.changeEmitter.emit(pack)
      })
  }

  savePack(pack: Pack): void {
    localStorage.setItem(pack.id, JSON.stringify(pack))
  }

  loadPackFromStorage(packID: string): Pack {
    const data = localStorage.getItem(packID)
    if (!data)
      throw `"${packID}" is not stored in local storage!`

    let pack
    try {
      pack = JSON.parse(data)
    } catch (_) {
      throw `"${packID}" does not store a music pack in local storage!`
    }

    return pack as Pack
  }

}
