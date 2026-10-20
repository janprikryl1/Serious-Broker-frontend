export type ArticleProps = {
  id: number
  user_firstname: string
  user_surname: string
  language: string
  title: string
  description: string
  created: string
  changed: string
  allowComments: boolean
  articleTypeOption: string
  premiumOnly: boolean
  banner: string
  in_watchlist: boolean
  is_read: boolean
}

export type ContentAnimation = {
  from: {
    x: number
    y: number
  }
  to: {
    x: number
    y: number
  }
}

export type ContentSection = {
  id: number
  task: string
  image: string
  animateTo: ContentAnimation
}

export type ContentType = {
  id: number
  title: string
  tasks: ContentSection[]
}

export type SubjectType = {
  id: number
  title: string
  text: string
}

export type ArticleDetailProps = ArticleProps & {
  content: ContentType[]
  subjects: SubjectType[]
  publicationType: number
  publicationFrom: string
  publicationTo: string
  publicationFromDays: number | null
  templateId: number
  titleImage: string
}

export type ArticleCreateProps = {
  language: string
  title: string
  description: string
  premiumOnly: boolean
  templateId: number
  publicationType: number
  publicationFrom: string
  content: string
  subjects: string
  publicationTo: string
  publicationFromDays: number | null
  allowComments: boolean
  titleImage: string
  articleTypeOption: string
  banner: string
}

export type ArticleUpdateType = ArticleCreateProps & {
  id: number
}

export type CommentType = {
  id: number
  articleId: number
  user: string
  text: string
  created: string
}

export type ArticlePostListResponseResponse = {
  id: number
  article_id: string
  type: string
  title: string
  created: string
}

export type ArticlePostListResponse = {
  article_name: string
  data: ArticlePostListResponseResponse[]
  languages: string[]
}

export type ArticlePost = {
  id?: string
  article_id: string
  type: string
  language: string
  title: string
  description: string
  content: string
  created?: string
  changed?: string
}

export type ImageListItemDto = {
  id: number
  image: string
  created: string
}

export type TranslationsOverview = {
  id: number | null
  language: string
}

export type TranslateEditLoadType = {
  id: number
  object_id: number
  title: string
  description: string
  language: string
  content: ContentType[]
  subjects: SubjectType[]
  templateId: number
}

export type ArticleNewTranslateEditType = {
  articleId: number
  language: string
  title: string
  description: string
  content: ArticleCreateProps["content"]
  subjects: ArticleCreateProps["subjects"]
}

export type ArticleTranslateEditType = ArticleNewTranslateEditType & {
  translateId: number
}

export type TranslateReturnType = {
  translatedText: string
}
