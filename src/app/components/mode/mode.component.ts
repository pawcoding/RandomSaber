import {Component, Input, OnInit} from '@angular/core';
import {Mode} from "../../enums/Mode";
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-mode',
  templateUrl: './mode.component.html'
})
export class ModeComponent implements OnInit {

  readonly Mode = Mode

  @Input()
  selected? : Mode

  constructor() { }

  ngOnInit(): void {
  }

  originalOrder = (a: KeyValue<any, string>, b: KeyValue<any, string>) => 0

}
