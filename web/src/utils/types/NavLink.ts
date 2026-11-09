import type {ReactNode} from "react";

export type NavLink = {
    title: string;
    link: string;
    icon?: ReactNode;
}

type SubNavLink = {
    title: string;
    subLinks: Record<string, NavLink>;
}

export type NavbarURLs = Record<string, NavLink | SubNavLink>;
