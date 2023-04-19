import {computed, effect, EventEmitter, inject, Injectable, Signal, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pack} from "../interfaces/Pack";
import {BehaviorSubject, catchError, debounce, debounceTime, firstValueFrom, map, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PackLoaderService {
  // inject services
  private readonly http = inject(HttpClient)

  // url of pack registry
  private readonly dataUrl = 'https://raw.githubusercontent.com/pawcoding/RandomSaber/main/packs'

  // initialize signals
  private readonly register = signal<string[]>([])
  private packs = signal<{ [id: string]: Pack}>({})

  // private readonly register$ = new BehaviorSubject<string>('')
  // private readonly packs$ = new BehaviorSubject<Pack[]>([])

  // public packs: Pack[] = []

  // public changeEmitter: EventEmitter<Pack>

  constructor() {
    // Reload packs when register changes
    effect(async () => {
      if (this.register().length < 1)
        return

      console.log('📁 Register loaded')

      // Load packs in parallel
      const packs = await Promise.all(
        this.register().map(
          this.loadPack.bind(this)
        )
      )
      this.packs.set(
        packs.reduce(
          (acc, pack, currentIndex) =>
            ({...acc, [pack.id]: pack}), {}
        )
      )
    })

    // this.changeEmitter = new EventEmitter<Pack>()
    // this.changeEmitter.subscribe(pack => {
    //   this.savePack(pack)
    // })

    // this.register$.subscribe(register => {
    //   localStorage.setItem('register', register)
    //   register.split('\n')
    //     .forEach(packID => packID && this.fetchMusicPack(packID))
    // })

    // this.packs$.pipe(
    //   debounceTime(500),
    //   map(packs => this.packs.sort((a, b) => this.register$.getValue().indexOf(a.id) - this.register$.getValue().indexOf(b.id)))
    // )

    // Trigger loading of register in async context
    window.setTimeout(async () => {
      this.register.set(await this.loadRegister())
    })
  }

  /**
   * Load register from server or local storage.
   */
  private async loadRegister(): Promise<string[]> {
    let registerContent = localStorage.getItem('register') ?? ''

    try {
      // Prefer server to local storage if register changes
      registerContent = await firstValueFrom(this.http.get<string>(`${this.dataUrl}/.register`, {responseType: 'text'} as Object))
      localStorage.setItem('register', registerContent)
    } catch (e) {
      console.error('Could not load register from server, using local storage instead', e)
    }

    // Split register into pack ids and filter empty lines
    return registerContent
      .split('\n')
      .filter(packId => packId)
  }

  /**
   * Load pack from server or local storage.
   * @param packId Unique pack id
   */
  private async loadPack(packId: string): Promise<Pack> {
    const pack = await firstValueFrom(this.http.get<Pack>(`${this.dataUrl}/${packId}.json`))

    pack.songs.forEach((song, index) => song.number = index)

    try {
      const saved = this.loadPackFromStorage(packId)
      pack.songs.forEach(song => song.active = saved.songs.find(s => s.number === song.number)?.active || false)
    } catch (_) {
      if (pack.type === 'OST')
        pack.songs.forEach(song => song.active = true)
    }

    return pack
  }

  // fetchMusicPack(packID: string) {
  //   this.http.get<Pack>(`${this.dataUrl}/${packID}.json`)
  //     .pipe(
  //       catchError(_ => {
  //         return of(this.loadPackFromStorage(packID))
  //       })
  //     )
  //     .subscribe(pack => {
  //       pack.songs.forEach((song, index) => song.number = index)
  //
  //       try {
  //         const saved = this.loadPackFromStorage(packID)
  //         pack.songs.forEach(song => song.active = saved.songs.find(s => s.number === song.number)?.active || false)
  //       } catch (_) {
  //         if (pack.type === 'OST')
  //           pack.songs.forEach(song => song.active = true)
  //       }
  //
  //       this.packs$.next([pack, ...this.packs$.getValue()])
  //
  //       // this.packs.push(pack)
  //       // this.packs.sort((a, b) => this.register$.getValue().indexOf(a.id) - this.register$.getValue().indexOf(b.id))
  //       this.changeEmitter.emit(pack)
  //     })
  // }

  /**
   * Update pack settings and save to local storage.
   * @param pack Pack to update
   */
  public savePack(pack: Pack): void {
    this.packs.set({...this.packs(), [pack.id]: pack})
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

  public getPacks() {
    return computed(() => Object.values(this.packs()))
  }

}
