import { lazy, Suspense, type FC } from "react"
import { Route, Routes } from "react-router"
import { Loader2 } from "lucide-react"
import { routes } from "@/utils/constants/routes.ts"
import { AdminLayout } from "@/components/layout/AdminLayout.tsx"

const Overview = lazy(() =>
  import("@/pages/Overview.tsx").then((m) => ({ default: m.Overview }))
)
const UserManagement = lazy(() =>
  import("@/pages/UserManagement.tsx").then((m) => ({
    default: m.UserManagement,
  }))
)
const NewsletterManagement = lazy(() =>
  import("@/pages/NewsletterManagement.tsx").then((m) => ({
    default: m.NewsletterManagement,
  }))
)
const GlossaryManagement = lazy(() =>
  import("@/pages/GlossaryManagement.tsx").then((m) => ({
    default: m.GlossaryManagement,
  }))
)
const TableLog = lazy(() =>
  import("@/pages/TableLog.tsx").then((m) => ({ default: m.TableLog }))
)
const FeedbackManagement = lazy(() =>
  import("@/pages/FeedbackManagement.tsx").then((m) => ({
    default: m.FeedbackManagement,
  }))
)
const AchievementsManagement = lazy(() =>
  import("@/pages/AchievementsManagement.tsx").then((m) => ({
    default: m.AchievementsManagement,
  }))
)
const CoinSettings = lazy(() =>
  import("@/pages/CoinSettings.tsx").then((m) => ({
    default: m.CoinSettings,
  }))
)
const CachedData = lazy(() =>
  import("@/pages/CachedData.tsx").then((m) => ({ default: m.CachedData }))
)
const QRManagement = lazy(() =>
  import("@/pages/QRManagement.tsx").then((m) => ({
    default: m.QRManagement,
  }))
)
const DemosManagement = lazy(() =>
  import("@/pages/DemosManagement.tsx").then((m) => ({
    default: m.DemosManagement,
  }))
)
const DemoEdit = lazy(() =>
  import("@/pages/DemoEdit.tsx").then((m) => ({ default: m.DemoEdit }))
)
const BinanceIndexAbout = lazy(() =>
  import("@/pages/BinanceIndexAbout.tsx").then((m) => ({
    default: m.BinanceIndexAbout,
  }))
)
const GenericTableData = lazy(() =>
  import("@/pages/GenericTableData.tsx").then((m) => ({
    default: m.GenericTableData,
  }))
)
const GenericTableDataEdit = lazy(() =>
  import("@/pages/GenericTableDataEdit.tsx").then((m) => ({
    default: m.GenericTableDataEdit,
  }))
)
const GenericTableResults = lazy(() =>
  import("@/pages/GenericTableResults.tsx").then((m) => ({
    default: m.GenericTableResults,
  }))
)
const FormsOverview = lazy(() =>
  import("@/pages/FormsOverview.tsx").then((m) => ({
    default: m.FormsOverview,
  }))
)
const FormResponses = lazy(() =>
  import("@/pages/FormResponses.tsx").then((m) => ({
    default: m.FormResponses,
  }))
)
const FormEvaluationSettings = lazy(() =>
  import("@/pages/FormEvaluationSettings.tsx").then((m) => ({
    default: m.FormEvaluationSettings,
  }))
)
const NotFound = lazy(() =>
  import("@/pages/NotFound.tsx").then((m) => ({ default: m.NotFound }))
)

const PageLoader: FC = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <Loader2 className="size-8 animate-spin text-muted-foreground" />
    <span className="sr-only">Načítání…</span>
  </div>
)

export const Router: FC = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route
          path={`/${routes.index}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <Overview />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.users}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <UserManagement />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.newsletter}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <NewsletterManagement />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.glossary}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <GlossaryManagement />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.logTable}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <TableLog />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.feedbacks}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <FeedbackManagement />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.achievements}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <AchievementsManagement />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.coinSettings}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <CoinSettings />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.chachedData}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <CachedData />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.qr}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <QRManagement />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.demos}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <DemosManagement />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.newDemo}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <DemoEdit />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.editDemo}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <DemoEdit />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.binanceIndexAbout}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <BinanceIndexAbout />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.genericTableData}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <GenericTableData />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.newGenericTableData}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <GenericTableDataEdit />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.editGenericTableData}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <GenericTableDataEdit />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.genericsTableData}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <GenericTableResults />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.forms}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <FormsOverview />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.formResponses}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <FormResponses />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.formEvaulationSettings}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <FormEvaluationSettings />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<PageLoader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}
