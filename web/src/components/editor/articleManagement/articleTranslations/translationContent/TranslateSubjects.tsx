import {FC} from "react";
import {Form, InputGroup} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {Button} from "../../../../reusable/Button.tsx";
import {useTranslateSubjects} from "../../../../../utils/hooks/useTranslateSubjects.ts";

export const TranslateSubjects:FC = () => {
    const {t} = useTranslation();
    const {
        subjects,
        handleSetSubjectTitle,
        handleTranslateSubjectText,
        handleAddSubject,
        handleTranslateSubjectTitle,
        handleSetSubjectText
    } = useTranslateSubjects();

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
                        <InputGroup.Text>{t("Text")}</InputGroup.Text>
                        <Form.Control as="textarea" placeholder={t("Detailed description...")} value={subject.text} onChange={(e) => handleSetSubjectText(e.target.value, subject.id)}/>
                        <Button onClick={() => handleTranslateSubjectText(subject.id)}>{t("Translate")}</Button>
                    </InputGroup>
                </div>
            ))}
            <Button onClick={handleAddSubject}>+</Button>
            <br/><br/>
        </>
    )
}