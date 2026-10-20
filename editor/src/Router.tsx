import { lazy, Suspense, type FC } from "react"
import { Route, Routes } from "react-router"
import { Loader2 } from "lucide-react"
import { routes } from "@/utils/constants/routes.ts"
import { EditorLayout } from "@/components/layout/EditorLayout.tsx"

const Overview = lazy(() =>
  import("@/pages/Overview.tsx").then((m) => ({ default: m.Overview }))
)
const ArticlesManagement = lazy(() =>
  import("@/pages/ArticlesManagement.tsx").then((m) => ({
    default: m.ArticlesManagement,
  }))
)
const ArticleEdit = lazy(() =>
  import("@/pages/ArticleEdit.tsx").then((m) => ({ default: m.ArticleEdit }))
)
const ArticleComments = lazy(() =>
  import("@/pages/ArticleComments.tsx").then((m) => ({
    default: m.ArticleComments,
  }))
)
const ArticleShare = lazy(() =>
  import("@/pages/ArticleShare.tsx").then((m) => ({ default: m.ArticleShare }))
)
const ArticleTranslateList = lazy(() =>
  import("@/pages/ArticleTranslateList.tsx").then((m) => ({
    default: m.ArticleTranslateList,
  }))
)
const TranslateEdit = lazy(() =>
  import("@/pages/TranslateEdit.tsx").then((m) => ({
    default: m.TranslateEdit,
  }))
)
const PostEdit = lazy(() =>
  import("@/pages/PostEdit.tsx").then((m) => ({ default: m.PostEdit }))
)
const HighlightsManagement = lazy(() =>
  import("@/pages/HighlightsManagement.tsx").then((m) => ({
    default: m.HighlightsManagement,
  }))
)
const HighlightEdit = lazy(() =>
  import("@/pages/HighlightEdit.tsx").then((m) => ({
    default: m.HighlightEdit,
  }))
)
const EditorHelp = lazy(() =>
  import("@/pages/EditorHelp.tsx").then((m) => ({ default: m.EditorHelp }))
)
const NotFound = lazy(() =>
  import("@/pages/NotFound.tsx").then((m) => ({ default: m.NotFound }))
)

const PageLoader: FC = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <Loader2 className="text-muted-foreground size-8 animate-spin" />
    <span className="sr-only">Načítání…</span>
  </div>
)

export const Router: FC = () => {
  return (
    <Routes>
      <Route element={<EditorLayout />}>
        <Route
          path={`/${routes.index}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <Overview />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.articles}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <ArticlesManagement />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.articleNew}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <ArticleEdit />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.articleEdit}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <ArticleEdit />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.articleComments}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <ArticleComments />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.articleShare}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <ArticleShare />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.articleTranslate}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <ArticleTranslateList />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.translations}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <TranslateEdit />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.translationsEdit}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <TranslateEdit />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.postEdit}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <PostEdit />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.highlights}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <HighlightsManagement />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.highlightsNew}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <HighlightEdit />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.highlightsEditor}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <HighlightEdit />
            </Suspense>
          }
        />
        <Route
          path={`/${routes.help}`}
          element={
            <Suspense fallback={<PageLoader />}>
              <EditorHelp />
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
