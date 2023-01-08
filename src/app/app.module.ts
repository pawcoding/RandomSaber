import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DifficultyComponent } from './components/difficulty/difficulty.component';
import { ModeComponent } from './components/mode/mode.component';
import { ToPlayComponent } from './components/to-play/to-play.component';
import { MusicPacksComponent } from './components/music-packs/music-packs.component';
import { PackComponent } from './components/pack/pack.component';
import {HttpClientModule} from "@angular/common/http";
import { SongSelectorComponent } from './components/song-selector/song-selector.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    DifficultyComponent,
    ModeComponent,
    ToPlayComponent,
    MusicPacksComponent,
    PackComponent,
    SongSelectorComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: !isDevMode(),
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
