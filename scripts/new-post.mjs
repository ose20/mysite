import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const [slug] = args;

if (args.length !== 1 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
	console.error('使い方: pnpm new-post <記事名>');
	console.error('記事名には半角英小文字・数字と、単語を区切るハイフンを使ってください。');
	process.exit(1);
}

const date = new Intl.DateTimeFormat('ja-JP', {
	timeZone: 'Asia/Tokyo',
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
}).format(new Date());
const postSlug = `${date.replaceAll('/', '')}-${slug}`;
const directory = new URL(`../src/content/blog/${postSlug}/`, import.meta.url);

const template = `---
title: '記事タイトル'
pubDate: '${date}'
tags: []
---

`;

try {
	await mkdir(directory);
	await writeFile(new URL('index.mdx', directory), template, { flag: 'wx' });
	console.log(`作成しました: ${fileURLToPath(new URL('index.mdx', directory))}`);
} catch (error) {
	if (error.code === 'EEXIST') {
		console.error(`記事フォルダが既に存在します: ${postSlug}`);
	} else {
		console.error(`記事を作成できませんでした: ${error.message}`);
	}
	process.exitCode = 1;
}
