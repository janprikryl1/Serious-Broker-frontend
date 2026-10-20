import {FC} from "react";
import {Form, InputGroup} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {ArticleTemplates} from "../articleTemplates/ArticleTemplates.tsx";
import {ListFilesModal} from "./NewArticleContent/imageUpload/ListFilesModal.tsx";
import {useArticleCreate} from "../../../../../utils/providers/ArticleCreateProvider.tsx";
import {useModal} from "../../../../../utils/hooks/useModal.tsx";
import {languages} from "../../../../../utils/options/languages.ts";
import {Button} from "../../../../reusable/Button.tsx";
import {articleTypes} from "../../../../../utils/options/articleTypes.ts";
import {publicationOptions} from "../../../../../utils/options/publicationOptions.ts";

export const NewArticleSettings:FC = () => {
    const {t} = useTranslation();
    const {name, 
        setName, 
        articleTypeOption,
        setArticleTypeOption,
        setPublicationType,
        publicationType,
        setPremiumOnly,
        premiumOnly,
        setTemplate,
        template,
        setDescription,
        description,
        setLanguage,
        language,
        publicateFrom,
        setPublicateFromDays,
        publicateTo,
        setPublicateTo,
        setPublicateFrom,
        publicateFromDays,
        allowComments,
        setAllowComments,
        banner,
        setBanner} = useArticleCreate();

    const { isOpen: isFileModalOpen, openModal: openFileModal, closeModal: closeFileModal } = useModal();
    
    const handleSetPathOfImage = (path: string) => {
        setBanner(path);
        closeFileModal();
    };

    return (
        <div>
            <h1>{t("New article")}</h1>
            <InputGroup className="mb-3">
                <InputGroup.Text>{t("Title")}</InputGroup.Text>
                <Form.Control placeholder={t("How to buy Bitcoin...")} value={name} onChange={(e) => setName(e.target.value)}/>
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text>{t("Description")}</InputGroup.Text>
                <Form.Control as="textarea" placeholder={t("This article will be about...")} value={description}
                              onChange={(e) => setDescription(e.target.value)}/>
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text>{t("Language")}</InputGroup.Text>
                <Form.Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    {languages.map((language) => (
                        <option value={language.id} key={language.id}>{language.name}</option>
                    ))}
                </Form.Select>
            </InputGroup>
            
            <InputGroup className="mb-3">
                <div className="col-sm-4">
                    <h4>{t("Banner")}</h4>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>{t("Image")}</InputGroup.Text>
                        <Button onClick={openFileModal}>
                            {banner || t("Choose image")}
                        </Button>
                    </InputGroup>
                </div>
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text>{t("Article type")}</InputGroup.Text>
                <Form.Select value={articleTypeOption}
                             onChange={(e) => setArticleTypeOption(e.target.value as "article" | "new")}>
                    {articleTypes.map((articleType) => (
                        <option value={articleType.id} key={articleType.id}>{articleType.title}</option>
                    ))}
                </Form.Select>
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text>{t("Publication")}</InputGroup.Text>
                <Form.Select value={publicationType} onChange={(e) => setPublicationType(parseInt(e.target.value))}>
                    {publicationOptions.map((publicationOption) => (
                        <option value={publicationOption.id}
                                key={publicationOption.id}>{t(publicationOption.title)}</option>
                    ))}
                </Form.Select>
            </InputGroup>

            {(publicationType === 1 || publicationType === 3) && (
                <InputGroup className="mb-3">
                    <InputGroup.Text>{t("Date of publication")}</InputGroup.Text>
                    <Form.Control type="date" value={publicateFrom} onChange={(e) => setPublicateFrom(e.target.value)}/>
                </InputGroup>
            )}
            {(publicationType === 2 || publicationType === 3) && (
                <InputGroup className="mb-3">
                    <InputGroup.Text>{t("Date of deleting")}</InputGroup.Text>
                    <Form.Control type="date" value={publicateTo} onChange={(e) => setPublicateTo(e.target.value)}/>
                </InputGroup>
            )}
            {publicationType === 4 && (
                <InputGroup className="mb-3">
                    <InputGroup.Text>{t("Days")}</InputGroup.Text>
                    <Form.Control type="number" placeholder={t("Offer the number of days since registration")} value={publicateFromDays ?? 0} onChange={(e) => setPublicateFromDays(parseInt(e.target.value))}/>
                </InputGroup>
            )}

            <InputGroup>
                <InputGroup.Text>{t("Premium article")}</InputGroup.Text>
                <InputGroup.Checkbox checked={premiumOnly} onChange={(e) => setPremiumOnly(e.target.checked)}/>
            </InputGroup>
            <br/>
            <InputGroup>
                <InputGroup.Text>{t("Allow comments")}</InputGroup.Text>
                <InputGroup.Checkbox checked={allowComments} onChange={(e) => setAllowComments(e.target.checked)}/>
            </InputGroup>
            <br />

            <h2>{t("Select template")}</h2>
            <ArticleTemplates selected={template} setSelected={setTemplate}/>

            <ListFilesModal
                isOpen={isFileModalOpen}
                handleSetPath={(path: string) => handleSetPathOfImage(path)}
                handleModalClose={closeFileModal}
            />
        </div>
    )
}
