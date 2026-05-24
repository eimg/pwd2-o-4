import { createContext, useContext } from "react";

const AppContext = createContext();

function Title() {
    const count = useContext(AppContext);

    return <h1>Hello Context ({count})</h1>
}

function Toolbar() {
    return <div>
        <Title />
    </div>
}

function Header() {
    return <div style={{ padding: 20, background: "cyan" }}>
        <Toolbar />
    </div>
}

export default function App() {
    const count = 10;
    
    return <AppContext.Provider value={count}>
        <Header />
    </AppContext.Provider>
}
