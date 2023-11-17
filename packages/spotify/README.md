# Spotify Wrapper

An UNOFFICIAL wrapper for Spotify REST API written in typescript.

You can visit the official docs for Spotify [here][spotify docs] to find out everything you can do.

> [!IMPORTANT]
>
> This project is still under development, not everything supported yet.

## Installation

```sh-session
npm i @rygent/spotify
yarn add @rygent/spotify
pnpm i @rygent/spotify
```

## Usage

```ts
import { Spotify } from '@rygent/spotify';
import config from './config.js';

const spotify = new Spotify({
    id: config.client_id, // Your client_id
    secret: config.client_secret // Your client_secret
});

await spotify.search({ type: ['track', 'album'], query: 'Happier Than Ever' });
await spotify.search({ type: ['artist'], query: 'Billie Eilish' });
```

> [!NOTE]
>
> - **offset**: This property is optional and the default value is `0`.
> - **limit**: This property is optional and the default value is `20`.

---

<i>This project is not affiliated with nor endorsed by Spotify.</i>

<!-- LINKS -->

[spotify docs]: https://developer.spotify.com/documentation/web-api
