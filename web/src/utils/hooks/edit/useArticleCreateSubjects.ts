import {useArticleCreate} from "../../providers/ArticleCreateProvider.tsx";

export const useArticleCreateSubjects = () => {
    const {setSubjects} = useArticleCreate();

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
    
    return {
        handleSetSubjectTitle,
        handleSetSubjectText,
        handleAddSubject
    }
}