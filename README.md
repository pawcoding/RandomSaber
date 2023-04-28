# Random Saber

[![GitHub](https://img.shields.io/github/license/pawcoding/randomsaber?color=brightgreen)](https://github.com/pawcoding/randomsaber/blob/main/LICENSE)
![Version](https://img.shields.io/badge/version-3.0.1-orange)
![Pipeline Checks](https://img.shields.io/github/actions/workflow/status/pawcoding/randomsaber/test.yaml?branch=main)
[![Discord](https://badgen.net/discord/members/GzgTh4hxrx)](https://discord.gg/GzgTh4hxrx)

[![Live Demo](https://img.shields.io/badge/live--demo-online-blue)](https://randomsaber.apps.pawcode.de)
[![Storybook](https://img.shields.io/badge/storybook-deeppink)](https://www.chromatic.com/library?appId=644b7fdf439968d5b404d5e8)

Are you a proud owner of vr-glasses including [BeatSaber](https://beatsaber.com/)?
Have you bought way too many music packs (or custom songs) to decide which song you want to play?  
This webapp is just the right thing to solve your luxury problem!

![Screenshot](/assets/screenshot.jpg)

If you have further ideas for the tool or would like to contribute yourself, please visit my [Discord](https://discord.gg/GzgTh4hxrx) server.
All suggestions are discussed there, tasks are distributed and help is offered.

## Music Packs

The data for the music packs is stored and retrieved directly here on GitHub in the `/packs`-directory.
The `.register`-file contains the IDs for all currently available music packs.
Each of these packs has its own file with a special schema, which is provided in the `.pack.schema.json`-file.

Here is an example taken from `ost1.json`:

```json
{
  "$schema": "https://raw.githubusercontent.com/pawcoding/RandomSaber/main/packs/.pack.schema.json",
  "id": "ost1",             // ID identical to the file name
  "title": "Original Soundtrack Vol. 1", // Human readable title for the pack
  "type": "OST",            // Type of music pack [OST, ADDON, CUSTOM]
  "img": "https://beatsaber.com/images/music/music1.jpg", // URL for cover art
  "songs": [
    {
      "title": "$100 Bills",// Song title
      "modes": {
        "twoSabers": 11111, // Playable in all difficulties with two sabers
        "oneSaber": 1000,   // Only available on 'Expert' with one saber
        "noArrows": 1111,   // Available in every difficulty but 'Expert+' with no arrows
        "full": 10,         // Only available on 'Normal' in 360° mode
        "quarter": 10       // Only available on 'Normal' in 90° mode
      }
    }, ...
  ]
}
```

## Roadmap

| Status | Version | Features                      |
| ------ | ------- | ----------------------------- |
| 🟩     | `1.0.0` | Proof of Concept              |
| 🟩     | `2.0.0` | Packs fetched from Repository |
| 🟩     | `3.0.0` | Progressive Web App           |
| 🟥     | `3.0.1` | Redesign                      |
| 🟥     | `3.0.2` | Favicon                       |
| 🟥     | `3.1.0` | Custom Songs                  |
| 🟥     | `3.2.0` | Text-To-Speech                |

## Version 3.0.0

- [x] PWA Support
- [x] Footer
- [x] Local Fonts
- [ ] Redesign
- [ ] Favicon, etc.

## License

[MIT](https://github.com/pawcoding/randomsaber/blob/main/LICENSE)

## Author

Luis Wolf &lt;development@pawcode.de&gt;
