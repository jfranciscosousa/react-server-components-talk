import NewsList from "@/components/NewsList";
import { COUNTRIES } from "@/data/getNews";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: {
    country?: keyof typeof COUNTRIES;
  };
};

/**
 * Next.js utility to generate meta tags
 */
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  if (!params.country) return notFound();

  if (!Object.keys(COUNTRIES).includes(params.country))
    return notFound();

  return {
    title: `Top news for ${COUNTRIES[params.country].name}`,
  };
}

/**
 * Server components! All React components are now server components by default,
 * and all you need to do is to write an async function that returns JSX.
 */
export default async function Home({
  params: { country = "us" },
}: Props) {
  return <NewsList country={country} />;
}
