import {FC} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useArticleCreate} from "../../../../../../../../utils/providers/ArticleCreateProvider.tsx";

export const Subjects:FC = () => {
    const {t} = useTranslation();
    const {setSubjects, subjects} = useArticleCreate();

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
    
    return (
        <>
            <h1>{t("Subjects")}</h1>
            {subjects.map((subject) => (
                <div key={subject.id}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>{t("Title")}</InputGroup.Text>
                        <Form.Control placeholder={t("In this tutorial...")} onChange={(e) => handleSetSubjectTitle(e.target.value, subject.id)} value={subject.title}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Text</InputGroup.Text>
                        <Form.Control as="textarea" placeholder="..." value={subject.text} onChange={(e) => handleSetSubjectText(e.target.value, subject.id)}/>
                    </InputGroup> 
                </div>
            ))}
            <Button variant="warning" onClick={handleAddSubject}>+</Button>
            <br/><br/>
        </>
    )
}