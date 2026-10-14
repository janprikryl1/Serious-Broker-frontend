import type { ContentType, SubjectType } from "@/utils/types/article.ts"
import type { HighlightType } from "@/utils/types/highlight.ts"

export const defaultHighlight: HighlightType = {
  id: -1,
  title_cs: "",
  title: "",
  description_cs: "",
  description: "",
  created: "",
}

export const defaultContent: ContentType[] = [
  {
    id: 0,
    title: "",
    tasks: [
      {
        id: 0,
        task: "",
        image: "",
        animateTo: { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } },
      },
    ],
  },
]

export const defaultSubjects: SubjectType[] = [{ id: 0, title: "", text: "" }]

export const defaultTask = {
  id: 0,
  task: "",
  image: "",
  animateTo: { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } },
}
