# Astro Starter Kit: Blog

```sh
pnpm create astro@latest -- --template blog
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and Open Graph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## ブログ記事と画像

記事ごとに `src/content/blog/<post-slug>/` を作り、本文と画像をまとめます。

新しい記事は次のコマンドで作成できます。

```sh
pnpm new-post hoge
```

フォルダ名には日本時間の当日の日付を `yyyyMMdd-` の形で自動付与します。例えば2026年11月22日に実行すると、`src/content/blog/20261122-hoge/index.mdx` にタイトル・当日の日付（`yyyy/MM/dd`）・タグ欄を生成します。記事名に日付を含める必要はありません。タイトルと本文を編集し、使う画像を同じフォルダに置いてください。記事名には半角英小文字・数字・単語を区切るハイフンが使えます。同名のフォルダがある場合は上書きしません。

```text
src/content/blog/20261122-hoge/
├── index.mdx
├── hero.jpg
└── photo.jpg
```

- 本文は `index.mdx` に記述します。フォルダ名が記事IDになり、上の例のURLは `/blog/20261122-hoge/` になります。
- frontmatter の画像は `heroImage: ./hero.jpg` のように相対パスで指定します。
- 本文の画像は `![説明](./photo.jpg)`、または画像を import して `<Image />` で表示します。
- キャプションが必要な場合は `figure` と `figcaption` を使います。
- favicon などサイト共通の静的ファイルは `public/` に置きます。

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm new-post <記事名>`    | 記事フォルダと `index.mdx` を作成                 |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
