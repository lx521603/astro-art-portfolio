export const ROUTES = [
  { href: "/", label: "Art" },
  { href: "/about", label: "About" },
] as const;

// Icons from https://icon-sets.iconify.design
// Plausible fictional profiles for the theme-submission persona (Alex Rivera).
export const SOCIAL = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/viviwang911",
    icon: "mdi:instagram",
  },
  {
    label: "Website",
    href: "https://onee.be",
    icon: "mdi:web",
  },
] as const;

export const PERSONAL_INFO = {
  name: "王薇薇",
  title: "王薇薇",
  subtitle:
    "待编辑",
  role: "自由职业者",
  contact: "mailto:x@onee.be",
  contactLabel: "Say hello",
  avatar: "https://api.dicebear.com/9.x/lorelei/svg?seed=WangWeiwei",
  about: `关于我`,
} as const;

export const SEO_INFO = [
  {
    name: "description",
    content:
      "Digital art portfolio of Alex Rivera — illustration, mixed media, and quiet painted worlds.",
  },
  {
    name: "keywords",
    content: "王薇薇, digital art, illustration, mixed media, art portfolio",
  },
  { name: "author", content: PERSONAL_INFO.name },
];
