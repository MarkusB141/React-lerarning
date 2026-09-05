import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Navigation } from "../components/Navigation";

export function AppLayout() {
    const appName = 'Bettenverleih';

    const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div>
        <h1>{appName}</h1>

        <button onClick={() => setIsLoggedIn(previousIsLoggedIn => !previousIsLoggedIn)}>
            {isLoggedIn ? 'Abmelden' : 'Anmelden'}
        </button>

        <Navigation title="Bereiche" showTitle={true}/>
    
        <main>
            <Outlet />
        </main>
    </div>
  );
}