export interface NavLink {
    name: string;
    href: string;
}

export const navigationLinks: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Technology', href: '/technology' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
];
