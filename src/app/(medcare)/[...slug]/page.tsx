import { MedCarePageClient } from "@/components/medcare/MedCarePageClient";
import { allStaticSlugs, MEDCARE_PAGES } from "@/components/medcare/data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string[] }>;
};

function resolveRoute(slug: string[]) {
  const last = slug.at(-1);
  const mode = last === "create" ? "create" : slug.length > 1 && !MEDCARE_PAGES[slug.join("/")] ? "detail" : "list";
  const configPath = mode === "list" ? slug.join("/") : slug.slice(0, -1).join("/");
  const config = MEDCARE_PAGES[configPath];

  if (config?.rowAction === "modal" && mode !== "list") {
    return {
      config: undefined,
      mode,
      recordId: undefined,
    } as const;
  }

  return {
    config,
    mode,
    recordId: mode === "detail" ? last : undefined,
  } as const;
}

export function generateStaticParams() {
  return allStaticSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { config, mode } = resolveRoute(slug);

  return {
    title: config
      ? mode === "create"
        ? config.createAction || config.primaryAction
        : config.title
      : "7Care",
  };
}

export default async function MedCarePage({ params }: Props) {
  const { slug } = await params;
  const { config, mode, recordId } = resolveRoute(slug);

  if (!config) {
    notFound();
  }

  return <MedCarePageClient config={config} mode={mode} recordId={recordId} />;
}
