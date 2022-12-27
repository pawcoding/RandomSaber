import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pack} from "../interfaces/Pack";

@Injectable({
  providedIn: 'root'
})
export class PackLoaderService {

  private dataUrl = 'https://raw.githubusercontent.com/pawcoding/RandomSaber/angular_setup/packs'

  private register = ''

  public packs: Pack[] = []

  constructor(
    private http: HttpClient
  ) {
    this.fetchRegister()
      .subscribe(register => {
        this.register = register
        register.split('\n')
          .forEach(packID => packID && this.fetchMusicPack(packID))
      })
  }

  fetchRegister() {
    return this.http.get<string>(`${this.dataUrl}/.register`, {
      responseType: 'text'
    } as Object)
  }

  fetchMusicPack(packID: string) {
    this.http.get<Pack>(`${this.dataUrl}/${packID}.json`)
      .subscribe(pack => {
        pack.songs.forEach((song, index) => song.number = index)
        if (pack.type === 'OST')
          pack.songs.forEach(song => song.active = true)

        this.packs.push(pack)
        this.packs.sort((a, b) => this.register.indexOf(a.id) - this.register.indexOf(b.id))
      })
  }

}
