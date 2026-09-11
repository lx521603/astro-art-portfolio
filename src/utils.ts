import { Client } from "@notionhq/client";

export type NotionItem = { label: string; href: string };

export const SAMPLE_GALLERY: NotionItem[] = [
  {
    label: "Brushwork",
    href: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80",
  },
  // ... 其他默认数据
];

export const getNotionItems = async (
  options?: { auth?: string | undefined },
): Promise<NotionItem[]> => {
  // 直接从环境变量读取密钥（兼容常见命名），不强制要求函数传参
  const authToken = options?.auth || import.meta.env.NOTION_TOKEN || import.meta.env.NOTION_SECRET;
  const databaseId = import.meta.env.DATABASE_ID;

  if (!authToken || !databaseId) {
    return SAMPLE_GALLERY;
  }

  try {
    const notion = new Client({ auth: authToken });

    const response = await notion.databases.query({
      database_id: databaseId,
    });

    return response.results
      .map((page) => {
        if ("properties" in page) {
          const title = page.properties.Title;
          if (title && "type" in title && title.type === "title") {
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
