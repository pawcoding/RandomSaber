import {Component, Input, OnInit} from '@angular/core';
import {Difficulty} from "../../enums/Difficulty";
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html'
})
export class DifficultyComponent implements OnInit {

  readonly Difficulty = Difficulty

  @Input()
  selected? : Difficulty

  constructor() { }

  ngOnInit(): void {
  }

  originalOrder = (a: KeyValue<any, string>, b: KeyValue<any, string>) => 0

}
