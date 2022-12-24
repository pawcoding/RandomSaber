import { Component } from '@angular/core';
import {Difficulty} from "./enums/Difficulty";
import {Mode} from "./enums/Mode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'random-saber';
  difficulty = Difficulty.EXPERT
  mode = Mode.TWO_SABERS
}
