import {Component, Input, OnInit} from '@angular/core';
import {Pack} from "../../interfaces/pack";

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html'
})
export class PackComponent implements OnInit {

  @Input()
  pack?: Pack

  constructor() { }

  ngOnInit(): void {
  }

}
