import {useArticleTranslate} from "../providers/ArticleTranslateProvider.tsx";
import {translate} from "../api/translateService.ts";

export const useTranslateSubjects = () => {
    const {setSubjects, subjects, language} = useArticleTranslate();

    const handleSetSubjectTitle = (value: string, index: number) => {
        setSubjects((prevState) => prevState.map((subject, i) => {
            if (i === index) {
                return {...subject, title: value}
            }
            return subject;
        }))
    }

    const handleSetSubjectText = (value: string, index: number) => {
        setSubjects((prevState) => prevState.map((subject, i) => {
            if (i === index) {
                return {...subject, text: value}
            }
            return subject;
        }))
    }

    const handleAddSubject = () => {
        setSubjects((prevState) => [...prevState, {id: prevState.length, title: "", text: ""}]);
    }

    const handleTranslateSubjectTitle = async (index: number) => {
        const subjectTitle = subjects[index].title;
        const response = await translate(subjectTitle, language);
        if (!response) return;
        const translatedText = response.data.translated_text;
        handleSetSubjectTitle(translatedText, index);
    }

    const handleTranslateSubjectText = async (index: number) => {
        const subjectText = subjects[index].text;
        const response = await translate(subjectText, language);
        if (!response) return;
        const translatedText = response.data.translated_text;
        handleSetSubjectText(translatedText, index);
    }
    
    return {
        subjects,
        handleSetSubjectTitle,
        handleTranslateSubjectText,
        handleAddSubject,
        handleTranslateSubjectTitle,
        handleSetSubjectText
    }
}