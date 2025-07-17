import {FC, useEffect} from "react";
import { FiMail } from 'react-icons/fi';
import Logo from "../../utils/icons/logo/SB_only.svg";
import {SplitText} from "../../components/reusable/SplitText.tsx";
import {routes} from "../../utils/constants";
import {Link, useNavigate} from "react-router-dom";

export const ContactButton = ({ href, text, icon, primary = false }: {href: string, text: string, icon?: JSX.Element, primary?: boolean}) => {
    const primaryStyle = {
        backgroundColor: '#bda154',
        color: '#1a1a1a',
        border: '2px solid #89763f'
    };
    const secondaryStyle = {
        backgroundColor: 'transparent',
        border: '2px solid #89763f'
    };

    if (primary) {
        return (
            <a
                href={href}
                style={{
                    ...(primary ? primaryStyle : secondaryStyle),
                    width: '100%',
                    maxWidth: '380px',
                    padding: '1rem',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    fontWeight: '600',
                    transition: 'transform 0.2s ease, background-color 0.2s ease',
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
                {icon}
                <span>{text}</span>
            </a>
        );
    } 
    return (
        <Link to={href} style={{
            ...(primary ? primaryStyle : secondaryStyle),
            width: '100%',
            maxWidth: '380px',
            padding: '1rem',
            borderRadius: '12px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            fontWeight: '600',
            transition: 'transform 0.2s ease, background-color 0.2s ease',
        }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
            {icon}
            <span>{text}</span>
        </Link>
    );
};


export const Welcome:FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate(routes.home);
        }, 7000);
    }, []);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div style={{
                backgroundColor: '#252525',
                borderRadius: '24px',
                padding: '3rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                textAlign: 'center'
            }}>
                <img src={Logo} alt="logo" height={90} width={90} />

                <SplitText text="Serious Broker" />
                <SplitText text="Zaměřujeme se na pomoc při investování a rozšiřujeme povědomí o kryptoměnách." type="p" />

                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    marginTop: '1rem'
                }}>
                    <ContactButton
                        href="mailto:info@serious.broker"
                        text="info@serious.broker"
                        icon={<FiMail size={20} />}
                        primary
                    />

                    <ContactButton
                        href={routes.home}
                        text="Pokračovat"
                    />
                </div>

                <SplitText text="Váš důvěryhodný partner pro krypto svět" type="p" />
            </div>
        </div>
    )
}