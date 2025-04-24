import {FC} from "react";
import {Form, InputGroup} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useArticleCreate} from "../../../../../../../utils/providers/ArticleCreateProvider.tsx";
import {Button} from "../../../../../../reusable/Button.tsx";
import {useArticleCreateSubjects} from "../../../../../../../utils/hooks/edit/useArticleCreateSubjects.ts";

export const Subjects:FC = () => {
    const {t} = useTranslation();
    const {subjects} = useArticleCreate();
    const {handleSetSubjectTitle, handleSetSubjectText, handleAddSubject} = useArticleCreateSubjects();
    
    return (
        <>
            <h1>{t("Subjects")}</h1>
            {subjects.map((subject) => (
                <div key={subject.id}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>{t("Title")}</InputGroup.Text>
                        <Form.Control 
                            placeholder={t("In this tutorial...")} 
                            onChange={(e) => handleSetSubjectTitle(e.target.value, subject.id)} 
                            value={subject.title}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Text</InputGroup.Text>
                        <Form.Control 
                            as="textarea" 
                            placeholder="..."
                            value={subject.text} 
                            onChange={(e) => handleSetSubjectText(e.target.value, subject.id)}
                        />
                    </InputGroup> 
                </div>
            ))}
            <Button style={{fontSize:15, fontWeight:"bold"}} onClick={handleAddSubject}>+</Button>
            <br/><br/>
        </>
    )
}