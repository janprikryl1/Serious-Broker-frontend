export type NavLink = {
    title: string;
    link: string;
}

type SubNavLink = {
    title: string;
    subLinks: Record<string, NavLink>;
}

export type NavbarURLs = Record<string, NavLink | SubNavLink>;
