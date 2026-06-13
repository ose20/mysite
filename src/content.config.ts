import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// what: frontmatter の日付文字列を Date に変換する
// how: yyyy/MM/dd の形を分解して、年・月・日からローカル時刻の Date を組み立てる
const slashDate = z.string().regex(/^\d{4}\/\d{2}\/\d{2}$/).transform((value, context) => {
	const [yearText, monthText, dayText] = value.split('/');
	const year = Number(yearText);
	const month = Number(monthText);
	const day = Number(dayText);
	const parsedDate = new Date(year, month - 1, day);

	if (
		Number.isNaN(parsedDate.valueOf()) ||
		parsedDate.getFullYear() !== year ||
		parsedDate.getMonth() !== month - 1 ||
		parsedDate.getDate() !== day
	) {
		context.addIssue({
			code: z.ZodIssueCode.custom,
			message: '日付は yyyy/MM/dd 形式で指定してください。',
		});
		return z.NEVER;
	}

	return parsedDate;
});

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			// pubDate と updatedDate は yyyy/MM/dd で統一する
			pubDate: slashDate,
			updatedDate: slashDate.optional(),
			heroImage: z.optional(image()),
			tags: z.array(z.string()).default([]),
		}),
});

export const collections = { blog };
