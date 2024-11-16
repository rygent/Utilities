# Spotify Wrapper

An UNOFFICIAL wrapper for Spotify REST API written in typescript.

You can visit the official docs for Spotify [here][spotify docs] to find out everything you can do.

> [!IMPORTANT]
>
> This project is still under development, not everything supported yet.

## Installation

```sh
# NPM
npm i @rygent/spotify

# Yarn
yarn add @rygent/spotify

# PNPM
pnpm add @rygent/spotify
```

## Example

```ts
import { Spotify } from '@rygent/spotify';

const spotify = new Spotify({
    id: 'your client id',
    secret: 'your client secret'
});

await spotify.search({ type: 'track,album', query: 'Happier Than Ever' });
await spotify.search({ type: 'artist', query: 'Billie Eilish' });
```

> [!NOTE]
>
> -   **offset**: This property is optional and the default value is `0`.
> -   **limit**: This property is optional and the default value is `20`.

---

<!-- LINKS -->

[spotify docs]: https://developer.spotify.com/documentation/web-api
