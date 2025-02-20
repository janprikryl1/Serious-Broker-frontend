import {ChangeEvent, FC, useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {MdOutlineEmail} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {getNewslettersEmailsService} from "../../../utils/api/newslettersEmailsService.ts";
import {Button, ButtonColor} from "../../reusable/Button.tsx";

type Props = {
    url: string;
};

export const ArticleSendEmailComponent: FC<Props> = ({ url }) => {
    const { t } = useTranslation();
    const [emails, setEmails] = useState<string[]>([]);
    const [text, setText] = useState("");
    const navigate = useNavigate();
    
    const goBack = () => {
        navigate(-1);
    }
    
    useEffect(() => {
        const loadEmails = async () => {
            try {
                const response = await getNewslettersEmailsService();
                if (!response) return;
                setEmails(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        loadEmails();
    }, []);

    useEffect(() => {
        setText(`Dobrý den,\nS radostí oznamujeme, že vyšel nový článek. Naleznete ho tady: ${url}\nPěkný den, s pozdravem Serious Broker tým.`);
    }, [url]);

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const sendEmails = () => {
        const emailAddresses = emails.join(",");
        const encodedText = encodeURIComponent(text).replace(/%0A/g, "%0D%0A");
        window.location.href = `mailto:${emailAddresses}?subject=${encodeURIComponent(t("New Article"))}&body=${encodedText}`;
    };

    return (
        <>
            <Form.Label htmlFor="email-text">{t("Send emails")}</Form.Label>
            <Form.Control
                as="textarea"
                rows={5}
                value={text}
                onChange={handleTextChange}
            />
            <Button
                className="mt-3"
                style={{marginRight: 10}}
                onClick={sendEmails}
            >
                <MdOutlineEmail /> {t("Send")}
            </Button>
            <Button color={ButtonColor.red} className="mt-3" onClick={goBack}>{t("Back")}</Button>
        </>
    );
};
