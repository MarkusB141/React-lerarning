import { NavLink } from "react-router-dom";

type NavigationProps = {
    title: string;
    showTitle: boolean;
}

export function Navigation({ title, showTitle }: NavigationProps){
    const navigationItems = [
        {path: '/', label: 'Home'},
        {path: '/products', label: 'Produkte'},
        {path: '/customers', label: 'Kunden'},
        {path: '/rentals', label: 'Verleihübersicht'},
        {path: '/api-test', label: 'API-Test'}
    ];
    return (
        <nav>
            {showTitle && <h2>{title}</h2>}
            <ul className="flex flex-col md:flex-row gap-4 p-4 bg-slate-800 text-white rounded-lg">
                {navigationItems.map(item => (
                    <li key={item.path}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) => getNavLinkClass(isActive)}
                        >
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

function getNavLinkClass(isActive: boolean): string{
    return `hover:text-blue-300 ${isActive ? 'font-bold underline text-blue-300' : ''}`;
}