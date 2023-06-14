import Link from "next/link";
import { ReactNode } from "react";

export default async function Home({
  children,
  params,
}: {
  children: ReactNode;
  params: { country: string };
}) {
  return (
    <main className="flex min-h-screen flex-col p-24 max-w-6xl mx-auto">
      <h2 className="font-bold text-2xl mb-12">
        Top stories in the {params.country.toUpperCase()}
      </h2>

      <nav>
        <ul className="flex gap-2">
          <li>
            <Link prefetch={false} href="/news/us">
              EN
            </Link>
          </li>
          <li>
            <Link prefetch={false} href="/news/pt">
              PT
            </Link>
          </li>
        </ul>
      </nav>

      {children}
    </main>
  );
}
