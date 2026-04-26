# @videogen/player

[![npm shield](https://img.shields.io/npm/v/@videogen/player)](https://www.npmjs.com/package/@videogen/player)

Official VideoGen video player for the web. A lightweight wrapper that decodes VideoGen public playback IDs and renders a branded player.

## Installation

```sh
npm i @videogen/player
```

## Usage

```typescript
import { createVideoGenPlayer } from "@videogen/player";

const container = document.getElementById("player-container");

createVideoGenPlayer(container, {
  publicPlaybackId: "vg_play_...", // from the VideoGen API
});
```

## Configuration

| Option | Type | Description |
| --- | --- | --- |
| `publicPlaybackId` | `string` | **Required.** Encoded playback ID from the VideoGen API. |
| `autoplay` | `boolean` | Start playback automatically. |
| `muted` | `boolean` | Start muted. |
| `loop` | `boolean` | Loop playback. |
| `poster` | `string` | Poster image URL shown before playback. |
| `thumbnailTime` | `number` | Time (seconds) to use as the poster frame. |
| `startTime` | `number` | Time (seconds) to start playback from. |

## Documentation

Full API documentation is available at [videogen.io/docs](https://videogen.io/docs).
