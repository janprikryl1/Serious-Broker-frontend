export type ArticleCreateProps = {
    language: string,
    title: string,
    description: string,
    premiumOnly: boolean,
    templateId: string,
    publicationType: number,
    publicationFrom: string,
    content: string,
    subjects: string,
    publicationTo: string,
    publicationFromDays: number | null,
    allowComments: boolean,
    titleImage: string,
    articleTypeOption: string,
    banner: string
}