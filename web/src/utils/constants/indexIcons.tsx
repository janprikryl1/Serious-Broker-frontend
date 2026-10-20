import {PiBookOpenText} from "react-icons/pi";
import {CiBitcoin, CiCreditCard1} from "react-icons/ci";
import {RiCoinsLine} from "react-icons/ri";
import {IoBagRemoveOutline} from "react-icons/io5";
import {HiOutlineWallet} from "react-icons/hi2";
import {routes} from "./index.ts";

export const indexLinks = [
    {title: "Dictionary", icon: <PiBookOpenText />, link: routes.dictionary},
    {title: "Invest safely", icon: <CiCreditCard1 />, link: "/article/14"},
    {title: "How much can I earn from investing", icon: <CiBitcoin />, link: "/article/11"},
    {title: "How to invest", icon: <RiCoinsLine />, link: "/article/8"},
    {title: "When to start investing", icon: <IoBagRemoveOutline />, link: "/article/13"},
    {title: "How to avoid big losses", icon: <HiOutlineWallet />, link: "/article/10"},
]