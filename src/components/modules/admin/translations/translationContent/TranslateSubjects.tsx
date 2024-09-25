import {FC} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useArticleTranslate} from "../../../../../utils/providers/ArticleTranslateProvider.tsx";
import {translate} from "../../../../../api/translateService.ts";

export const TranslateSubjects:FC = () => {
    const {t} = useTranslation();
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

    return (
        <>
            <h1>{t("Subjects")}</h1>
            {subjects.map((subject) => (
                <div key={subject.id}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>{t("Title")}</InputGroup.Text>
                        <Form.Control placeholder={t("In this tutorial...")} onChange={(e) => handleSetSubjectTitle(e.target.value, subject.id)} value={subject.title}/>
                        <Button onClick={() => handleTranslateSubjectTitle(subject.id)}>{t("Translate")}</Button>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Text</InputGroup.Text>
                        <Form.Control as="textarea" placeholder="..." value={subject.text} onChange={(e) => handleSetSubjectText(e.target.value, subject.id)}/>
                        <Button onClick={() => handleTranslateSubjectText(subject.id)}>{t("Translate")}</Button>
                    </InputGroup>
                </div>
            ))}
            <Button variant="warning" onClick={handleAddSubject}>+</Button>
            <br/><br/>
        </>
    )
}