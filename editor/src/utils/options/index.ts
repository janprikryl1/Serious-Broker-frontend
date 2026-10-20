export const articleTypes = [
  { id: "article", title: "Výukový materiál" },
  { id: "new", title: "Aktualita" },
]

export const publicationOptions = [
  { id: 0, title: "Publikovat ihned" },
  { id: 1, title: "Publikovat od data" },
  { id: 2, title: "Publikovat do data" },
  { id: 3, title: "Publikovat v časovém rozmezí" },
  { id: 4, title: "Nabídnout po počtu dní od registrace" },
]

export const languages = [
  { id: "cs", name: "Čeština" },
  { id: "en", name: "English" },
  { id: "sk", name: "Slovenčina" },
  { id: "pl", name: "Polski" },
  { id: "de", name: "Deutsch" },
  { id: "uk", name: "Українська" },
  { id: "fr", name: "Français" },
  { id: "it", name: "Italiano" },
  { id: "es", name: "Español" },
  { id: "pt", name: "Português" },
  { id: "hr", name: "Hrvatski" },
  { id: "hu", name: "Magyar" },
  { id: "ru", name: "Русский" },
  { id: "nl", name: "Nederlands" },
  { id: "tr", name: "Türkçe" },
  { id: "ro", name: "Română" },
  { id: "bg", name: "Български" },
  { id: "lv", name: "Latviešu" },
  { id: "lt", name: "Lietuvių" },
  { id: "fi", name: "Suomi" },
  { id: "cn", name: "中文" },
  { id: "ja", name: "日本語" },
  { id: "no", name: "Norsk" },
  { id: "se", name: "Svenska" },
  { id: "dk", name: "Dansk" },
  { id: "ee", name: "Eesti" },
]

export const PostOption = [
  { id: "Facebook", title: "Facebook" },
  { id: "X", title: "X (Twitter)" },
  { id: "LinkedIn", title: "LinkedIn" },
  { id: "Instagram", title: "Instagram" },
  { id: "YouTube", title: "YouTube" },
]

export type PostOptionType =
  | "Facebook"
  | "X"
  | "LinkedIn"
  | "YouTube"
  | "Instagram"
