# Anilist Wrapper

An UNOFFICIAL wrapper for Anilist GraphQL API written in typescript.

You can visit the official graphql docs for Anilist [here][anilist docs] to find out everything you can do.

> [!IMPORTANT]
>
> This project is still under development, not everything supported yet.

## Installation

```sh-session
npm i @rygent/anilist
yarn add @rygent/anilist
pnpm i @rygent/anilist
```

## Usage

```ts
import { Anilist } from '@rygent/anilist';

const anilist = new Anilist();

await anilist.media.search({ type: 'Anime', search: 'Naruto' });
await anilist.media.search({ type: 'Manga', search: 'Naruto' });
```

> [!NOTE]
>
> - **page**: This property is optional and the default value is `1`.
> - **perPage**: This property is optional and the default value is `20`.

---

<i>This project is not affiliated with nor endorsed by AniList or AniChart.</i>

<!-- LINKS -->

[anilist docs]: https://anilist.github.io/ApiV2-GraphQL-Docs/
