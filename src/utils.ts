import { Client } from "@notionhq/client";

export type NotionItem = { label: string; href: string };

/** Sample art used when Notion credentials are not configured. */
export const SAMPLE_GALLERY: NotionItem[] = [
  {
    label: "Brushwork",
    href: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Color fields",
    href: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Still life",
    href: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Sketchbook",
    href: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Abstract",
    href: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Canvas",
    href: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Studio",
    href: "https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&w=1200&q=80",
  },
];

export const getNotionItems = async (
  options: { auth?: string | undefined },
): Promise<NotionItem[]> => {
  if (!options.auth || !import.meta.env.DATABASE_ID) {
    return SAMPLE_GALLERY;
  }

  try {
    const notion = new Client({ auth: options.auth });

    const response = await notion.databases.query({
      database_id: import.meta.env.DATABASE_ID,
    });

    return response.results
      .map((page) => {
        if ("properties" in page) {
          const title = page.properties.Title;
          if (title && "type" in title && title.type === "title") {
            // 修复：将所有文本片段合并，然后按换行符拆分
            const fullText = title.title.map((t) => t.plain_text).join("");
            const [label, href] = fullText.split("\n");

            if (!label || !href) return false;

            return {
              label: label.trim(),
              href: href.trim(),
            };
          }
        }
        return false;
      })
      .filter((item): item is NotionItem => !!item);
  } catch {
    return SAMPLE_GALLERY;
  }
};
