import { parseStringPromise } from "xml2js";
import { ZodTypeAny, z } from "zod";

function zArrayGetFirst<T extends ZodTypeAny>(schema: T) {
  return z
    .array(schema)
    .min(1)
    .transform((t) => t[0]);
}

export const schema = z.object({
  rss: z.object({
    channel: zArrayGetFirst(
      z.object({
        generator: zArrayGetFirst(z.string()),
        title: zArrayGetFirst(z.string()),
        link: zArrayGetFirst(z.string()),
        language: zArrayGetFirst(z.string()),
        webMaster: zArrayGetFirst(z.string()),
        copyright: zArrayGetFirst(z.string()),
        lastBuildDate: zArrayGetFirst(z.string()),
        description: zArrayGetFirst(z.string()),
        item: z.array(
          z.object({
            title: zArrayGetFirst(z.string()),
            link: zArrayGetFirst(z.string()),
            guid: zArrayGetFirst(
              z.object({
                _: z.string(),
                $: z.object({ isPermaLink: z.string() }),
              })
            ).transform((v) => v._),
            pubDate: zArrayGetFirst(z.string()),
            description: zArrayGetFirst(z.string()),
            source: zArrayGetFirst(
              z.object({
                _: z.string(),
                $: z.object({ url: z.string() }),
              })
            ),
          })
        ),
      })
    ),
  }),
});

export type NewsArticle = z.TypeOf<
  typeof schema
>["rss"]["channel"]["item"][number];

export const COUNTRIES = {
  us: {
    name: "United States",
    hl: "en",
    gl: "us",
    ceid: "US:en",
  },
  pt: {
    name: "Portugal",
    hl: "pt",
    gl: "pt",
    ceid: "pt:pt",
  },
} as const;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getNews(
  country: string
): Promise<NewsArticle[] | undefined> {
  await sleep(1000);

  if (!Object.keys(COUNTRIES).includes(country)) return undefined;

  // Object.keys and Array.includes are dumb in TS
  const arg = COUNTRIES[country as keyof typeof COUNTRIES];
  const url = new URL("https://news.google.com/rss");
  url.searchParams.set("hl", arg.hl);
  url.searchParams.set("gl", arg.gl);
  url.searchParams.set("ceid", arg.ceid);
  /*
    We are telling Next.js to revalidate this after
    60 seconds.

    By default this is "STALE WHILE REVALIDATE", meaning
    that after 60 seconds we still return cached data,
    but we revalidate on the background.

    This happens all on the server though.
  */
  const newsResponse = await fetch(url, {
    next: { revalidate: 60 },
  });
  const newsText = await newsResponse.text();
  const newsParsed = schema.safeParse(
    await parseStringPromise(newsText)
  );

  if (!newsParsed.success)
    throw new Error(
      "Unexpected error while retrieving news from Google."
    );

  return newsParsed.data.rss.channel.item;
}
