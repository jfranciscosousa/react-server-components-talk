import { getNews } from "@/data/getNews";
import { notFound } from "next/navigation";

/**
 * Server components! All React components are
 * now server components by default,
 * and all you need to do is to write an async
 * pfunction that returns JSX.
 */
export default async function NewsList({
  country,
}: {
  country: string;
}) {
  /**
   * Just `fetch` stuff from whatever.
   * Server side stuff works as well, Prisma,
   * any ORM client, etc!
   *
   * However React and Next.js do optimize `fetch`
   * calls by de-duping them, performing caching by
   * default, etc
   */
  const news = await getNews(country);

  if (!news) return notFound();

  return (
    <ul className="flex flex-col gap-4">
      {news.map((article) => (
        <li className="flex gap-2" key={article.guid}>
          <a className="underline" href={article.link}>
            <span>{article.title}</span>
          </a>

          <span>
            {new Date(article.pubDate).toLocaleDateString()}
          </span>
        </li>
      ))}
    </ul>
  );
}
