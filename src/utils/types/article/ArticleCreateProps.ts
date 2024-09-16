export type ArticleCreateProps = {
    language: string,
    title: string,
    description: string,
    allowComments: boolean,
    premiumOnly: boolean,
    tmplateId: number,
    publicationType: number,
    publicationFrom: string,
    content: string,
    subjects: string,
    publicatonTo: string,
    publicationFromDays: number | null;
}