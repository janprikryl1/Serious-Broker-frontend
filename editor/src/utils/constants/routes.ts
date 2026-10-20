import {
  FileText,
  HelpCircle,
  LayoutDashboard,
  Newspaper,
  Plus,
  Sparkles,
} from "lucide-react"
import type { NavigationEntry, NavRoute } from "@/utils/types/Route.ts"

/**
 * Cesty v editoru — router má basename "/editor", takže výsledné URL
 * zůstávají stejné jako dřív (/editor/articles, /editor/highlights atd.).
 */
export const routes = {
  index: "",
  articles: "articles",
  articleNew: "articles/new",
  articleEdit: "articles/edit/:id",
  articleComments: "article/comments/:id",
  articleShare: "article/share/:id",
  articleTranslate: "article/translate/:id",
  translations: "article/translations",
  translationsEdit: "article/translations/:id",
  postEdit: "article/post/edit/:articleId/:id?",
  highlights: "highlights",
  highlightsEditor: "highlits/editor/:id",
  highlightsNew: "highlits/editor",
  help: "help",
} as const

/**
 * Struktura vertikální navigace v ose Y (stejná koncepce jako v administraci)
 */
export const navigationStructure: NavigationEntry[] = [
  { path: routes.index, label: "Přehled", icon: LayoutDashboard, migrated: true },
  {
    type: "group",
    id: "articles",
    label: "Články",
    icon: Newspaper,
    children: [
      { path: routes.articles, label: "Správa článků", icon: FileText, migrated: true },
      { path: routes.articleNew, label: "Nový článek", icon: Plus, migrated: true },
    ],
  },
  { path: routes.highlights, label: "Highlighty", icon: Sparkles, migrated: true },
  { path: routes.help, label: "Nápověda", icon: HelpCircle, migrated: true },
]

/** Ploché položky navigace */
export const navRoutes: NavRoute[] = [
  { path: routes.index, label: "Přehled", icon: LayoutDashboard, migrated: true },
  { path: routes.articles, label: "Články", icon: Newspaper, migrated: true },
  { path: routes.highlights, label: "Highlighty", icon: Sparkles, migrated: true },
  { path: routes.help, label: "Nápověda", icon: HelpCircle, migrated: true },
]

/** Absolutní cesta položky — basename "/editor" router doplní jen u Linku. */
export const absoluteEditorPath = (path: string) =>
  path === "" ? "/editor/" : `/editor/${path}`

/** Odkaz do administrace — samostatný build na portu 5174, proto plná navigace přes <a>. */
export const ADMIN_URL = "/admin"
