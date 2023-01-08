import { Component, OnInit } from '@angular/core';
import {Pack} from "../../interfaces/Pack";
import {PackLoaderService} from "../../services/pack-loader.service";

@Component({
  selector: 'app-music-packs',
  templateUrl: './music-packs.component.html'
})
export class MusicPacksComponent implements OnInit {

  // { id: 'rock', title: 'Rock Mixtape', img: 'https://beatsaber.com/images/music/music21.jpg', type: 'ADDON' },
  // { id: 'weeknd', title: 'The Weeknd', img: 'https://beatsaber.com/images/music/music20.jpg', type: 'ADDON' },
  // { id: 'lizzo', title: 'Lizzo', img: 'https://beatsaber.com/images/music/music19.jpg', type: 'ADDON' },
  // { id: 'electronic', title: 'Electronic Mixtape', img: 'https://beatsaber.com/images/music/music18.jpg', type: 'ADDON' },
  // { id: 'fall', title: 'Fall Out Boy', img: 'https://beatsaber.com/images/music/music17.jpg', type: 'ADDON' },
  // { id: 'gaga', title: 'Lady Gaga', img: 'https://beatsaber.com/images/music/music15.jpg', type: 'ADDON' },
  // { id: 'eilish', title: 'Billie Eilish', img: 'https://beatsaber.com/images/music/music14.jpg', type: 'ADDON' },
  // { id: 'skrillex', title: 'Skrillex', img: 'https://beatsaber.com/images/music/music13.jpg', type: 'ADDON' },
  // { id: 'interscope', title: 'Interscope Mixtape', img: 'https://beatsaber.com/images/music/music12.jpg', type: 'ADDON' },
  // { id: 'bts', title: 'BTS', img: 'https://beatsaber.com/images/music/music10.jpg', type: 'ADDON' },

  packs: Pack[]

  osts: Pack[] = []

  addons: Pack[] = []

  constructor(
    private packLoaderService: PackLoaderService
  ) {
    this.packs = packLoaderService.packs

    packLoaderService.changeEmitter.subscribe(_ => {
      this.osts = this.packs.filter(pack => pack.type === 'OST')
      this.addons = this.packs.filter(pack => pack.type === 'ADDON')
    })
  }

  ngOnInit(): void {
  }

}
