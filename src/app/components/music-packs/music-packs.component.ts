import { Component, OnInit } from '@angular/core';
import {Pack} from "../../interfaces/pack";

@Component({
  selector: 'app-music-packs',
  templateUrl: './music-packs.component.html'
})
export class MusicPacksComponent implements OnInit {

  originals: Pack[] = [
    { id: 'ost1', title: 'OST Vol.1', img: 'https://beatsaber.com/images/music/music1.jpg', type: 'OST' },
    { id: 'ost2', title: 'OST Vol.2', img: 'https://beatsaber.com/images/music/music2.jpg', type: 'OST' },
    { id: 'ost3', title: 'OST Vol.3', img: 'https://beatsaber.com/images/music/OST3.jpg', type: 'OST' },
    { id: 'ost4', title: 'OST Vol.4', img: 'https://beatsaber.com/images/music/music11.jpg', type: 'OST' },
    { id: 'ost5', title: 'OST Vol.5', img: 'https://beatsaber.com/images/music/music16.jpg', type: 'OST' }
  ]

  added: Pack[] = [
    { id: 'rock', title: 'Rock Mixtape', img: 'https://beatsaber.com/images/music/music21.jpg', type: 'ADDED' },
    { id: 'weeknd', title: 'The Weeknd', img: 'https://beatsaber.com/images/music/music20.jpg', type: 'ADDED' },
    { id: 'lizzo', title: 'Lizzo', img: 'https://beatsaber.com/images/music/music19.jpg', type: 'ADDED' },
    { id: 'electronic', title: 'Electronic Mixtape', img: 'https://beatsaber.com/images/music/music18.jpg', type: 'ADDED' },
    { id: 'fall', title: 'Fall Out Boy', img: 'https://beatsaber.com/images/music/music17.jpg', type: 'ADDED' },
    { id: 'gaga', title: 'Lady Gaga', img: 'https://beatsaber.com/images/music/music15.jpg', type: 'ADDED' },
    { id: 'eilish', title: 'Billie Eilish', img: 'https://beatsaber.com/images/music/music14.jpg', type: 'ADDED' },
    { id: 'skrillex', title: 'Skrillex', img: 'https://beatsaber.com/images/music/music13.jpg', type: 'ADDED' },
    { id: 'interscope', title: 'Interscope Mixtape', img: 'https://beatsaber.com/images/music/music12.jpg', type: 'ADDED' },
    { id: 'bts', title: 'BTS', img: 'https://beatsaber.com/images/music/music10.jpg', type: 'ADDED' },
    { id: 'linkin', title: 'Linkin Park', img: 'https://beatsaber.com/images/music/music9.jpg', type: 'ADDED' },
    { id: 'timbaland', title: 'Timbaland', img: 'https://beatsaber.com/images/music/music8.jpg', type: 'ADDED' },
    { id: 'green', title: 'Green Day', img: 'https://beatsaber.com/images/music/music7.jpg', type: 'ADDED' },
    { id: 'rocket', title: 'Rocket League X Monstercat', img: 'https://beatsaber.com/images/music/music6.jpg', type: 'ADDED' },
    { id: 'panic', title: 'Panic! At The Disco', img: 'https://beatsaber.com/images/music/music5.jpg', type: 'ADDED' },
    { id: 'imagine', title: 'Imagine Dragons', img: 'https://beatsaber.com/images/music/ID.jpg', type: 'ADDED' },
    { id: 'monstercat', title: 'Monstercat', img: 'https://beatsaber.com/images/music/music4.jpg', type: 'ADDED' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
