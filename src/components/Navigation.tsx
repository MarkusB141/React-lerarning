import { NavLink } from "react-router-dom";

type NavigationProps = {
    title: string;
    showTitle: boolean;
}

export function Navigation({ title, showTitle }: NavigationProps){
    return (
        <div>
            {showTitle && <h2>{title}</h2>}
            <ul>
                <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                <li><NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>Produkte</NavLink></li>
                <li><NavLink to="/customers" className={({ isActive }) => isActive ? 'active' : ''}>Kunden</NavLink></li>
                <li><NavLink to="/rentals" className={({ isActive }) => isActive ? 'active' : ''}>Verleihübersicht</NavLink></li>
            </ul>
        </div>
    )
}