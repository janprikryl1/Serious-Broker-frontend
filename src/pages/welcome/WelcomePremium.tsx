import {FC, useEffect} from "react";
import { FiAward } from 'react-icons/fi';
import Logo from "../../utils/icons/logo/SB_only.svg";
import {SplitText} from "../../components/reusable/SplitText.tsx";
import {routes} from "../../utils/constants";
import {LuCrown} from "react-icons/lu";
import {ContactButton} from "./Welcome.tsx";
import {useNavigate} from "react-router-dom";



export const WelcomePremium:FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate(routes.home);
        }, 7000);
    }, []);
    
    return (
        <div style={{
            minHeight: "93vh",
            backgroundColor: '#121212',
            padding: '2rem'
        }}>
            <div style={{
                background: '#bda154',
                borderRadius: '28px',
                padding: '3px'
            }}>
                <div style={{
                    borderRadius: '26px',
                    padding: '3rem 2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem',
                    textAlign: 'center',
                    color: '#000'
                }}>
                    <LuCrown size={62} color="#89763f" />
                    <img src={Logo} alt="logo" height={100} width={100} style={{marginTop: '-1rem'}} />

                    <SplitText text="Vítejte" color="#000" />
                    <SplitText
                        text="Děkujeme za vaši důvěru."
                        type="p"
                        color="#000"
                    />

                    <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        marginTop: '1rem',
                        alignItems: 'center',
                    }}>
                        <ContactButton
                            href={routes.register}
                            text="Registrovat"
                            icon={<FiAward size={20} />}
                        />
                        
                        <ContactButton
                            href={routes.home}
                            text="Pokračovat"
                        />
                    </div>

                    <SplitText text="Vaše investice na prvním místě" type="p" color="#000" />
                </div>
            </div>
        </div>
    )
}