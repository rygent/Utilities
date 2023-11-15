# Spotify Wrapper

An UNOFFICIAL wrapper for Spotify REST API written in typescript.

You can visit the official docs for Spotify [here][spotify docs] to find out everything you can do.

> [!IMPORTANT]
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

const spotify = new Spotify({
    id: 'your client id',
    secret: 'your client secret'
});

// later on ...
await spotify.search({ type: 'track', query: 'I Me Mine' });
await spotify.search({ type: 'album', query: 'Let It Be' });
await spotify.search({ type: 'artist', query: 'The Beatles' });
```

> [!NOTE]
>
> -   **offset**: This property is optional and the default value is `0`.
> -   **limit**: This property is optional and the default value is `20`.

---

<i>This project is not affiliated with nor endorsed by Spotify.</i>

<!-- LINKS -->

[spotify docs]: https://developer.spotify.com/documentation/web-api
