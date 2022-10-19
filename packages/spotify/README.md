# Spotify API

A simple to use API library for the Spotify REST API.
Only supports searching for `track | album | artist` however the 2 former ones have not been tested.

#### What's Different?
* Uses ``undici`` instead.
* The code base has been completely rewritten to typescript.

## Installation

```sh-session
npm i @rygent/spotify
yarn add @rygent/spotify
```

## API

### Search

```js
<spotify>.search({ type: 'artist|album|track', query: 'My search query', offset: 0, limit: 20 });
```

#### Example

```js
const { Spotify } = require('@rygent/spotify');

const spotify = new Spotify({
    id: 'your client id',
    secret: 'your client secret'
});

// later on ...
await spotify.search({ type: 'track', query: 'I Me Mine' });
await spotify.search({ type: 'album', query: 'Let It Be' });
await spotify.search({ type: 'artist', query: 'The Beatles' });
```
> **Note**
> The `offset` property is optional and the search will default to `0` if one is not supplied.

> **Note**
> The `limit` property is optional and the search will default to `20` if one is not supplied.
