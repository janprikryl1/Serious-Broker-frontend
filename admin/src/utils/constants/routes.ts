import {
  Users,
  Mail,
  BookA,
  ScrollText,
  MessageSquare,
  Trophy,
  Coins,
  Database,
  QrCode,
  LayoutDashboard,
  Table2,
  FileQuestion,
  Info,
  LayoutTemplate,
  HardDrive,
} from "lucide-react"
import type { NavigationEntry, NavRoute } from "@/utils/types/Route.ts"

/**
 * Cesty jsou ZÁMĚRNĚ shodné s původními v `web/src/utils/constants/index.ts`
 * (sekce `routes.admin`). Router má basename "/admin", takže výsledné URL
 * zůstávají stejné jako dřív a staré odkazy i záložky fungují dál.
 */
export const routes = {
  index: "",
  users: "users",
  newsletter: "newsletter",
  glossary: "glossary",
  logTable: "log_table",
  feedbacks: "feedbacks",
  achievements: "achievements",
  coinSettings: "coin_settings",
  chachedData: "chached_data",
  qr: "qr",
  demos: "demos",
  editDemo: "demos/edit/:id",
  newDemo: "demos/edit",
  binanceIndexAbout: "binance_index_about",
  genericTableData: "generic_table_data",
  newGenericTableData: "generic_table_data/edit",
  editGenericTableData: "generic_table_data/edit/:id",
  genericsTableData: "generic_table_results/:id",
  forms: "forms",
  formResponses: "form_responses",
  formEvaulationSettings: "form_evaulation_settings",
} as const

/*
 * Struktura menu:
 * - Uživatelé: Přehled uživatelských dat, Achievementy, Newsletter
 * - Databáze: Nastavení coinů, Binance index, Generická data, Cache, Log
 * - Zbytek samostatně: Přehled, Slovník, Dema, Formuláře, Feedback, QR kódy
 */
export const navigationStructure: NavigationEntry[] = [
  {
    path: routes.index,
    label: "Přehled",
    icon: LayoutDashboard,
    migrated: true,
  },
  {
    type: "group",
    id: "users",
    label: "Uživatelé",
    icon: Users,
    children: [
      {
        path: routes.users,
        label: "Přehled uživatelských dat",
        icon: Users,
        migrated: true,
      },
      {
        path: routes.achievements,
        label: "Achievementy",
        icon: Trophy,
        migrated: true,
      },
      {
        path: routes.newsletter,
        label: "Newsletter",
        icon: Mail,
        migrated: true,
      },
    ],
  },
  {
    type: "group",
    id: "database",
    label: "Databáze",
    icon: Database,
    children: [
      {
        path: routes.coinSettings,
        label: "Nastavení coinů",
        icon: Coins,
        migrated: true,
      },
      {
        path: routes.binanceIndexAbout,
        label: "Binance index",
        icon: Info,
        migrated: true,
      },
      {
        path: routes.genericTableData,
        label: "Generická data",
        icon: Table2,
        migrated: true,
      },
      {
        path: routes.chachedData,
        label: "Cache",
        icon: HardDrive,
        migrated: true,
      },
      {
        path: routes.logTable,
        label: "Log",
        icon: ScrollText,
        migrated: true,
      },
    ],
  },
  {
    path: routes.glossary,
    label: "Slovník",
    icon: BookA,
    migrated: true,
  },
  {
    path: routes.demos,
    label: "Dema",
    icon: LayoutTemplate,
    migrated: true,
  },
  {
    path: routes.forms,
    label: "Formuláře",
    icon: FileQuestion,
    migrated: true,
  },
  {
    path: routes.feedbacks,
    label: "Feedback",
    icon: MessageSquare,
    migrated: true,
  },
  {
    path: routes.qr,
    label: "QR kódy",
    icon: QrCode,
    migrated: true,
  },
]

/** Plochý seznam pro případné hledání nebo fallbacky */
export const navRoutes: NavRoute[] = navigationStructure.flatMap((entry) =>
  "children" in entry ? entry.children : [entry]
)

/** Absolutní cesta položky sidebaru — basename "/admin" router doplní jen u Linku. */
export const absoluteAdminPath = (path: string) =>
  path === "" ? "/admin/" : `/admin/${path}`

/** Odkaz do editoru — samostatný build, proto plná navigace, ne `Link`. */
export const EDITOR_URL = "/editor"
