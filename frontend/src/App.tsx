import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Heading from "./Components/Heading";

function App() {
    return (
        <div className="min-h-screen flex flex-col bg-primary">
            <Heading />
            <main className="flex-1 min-h-0">
                <Outlet />
            </main>
            <ToastContainer position="bottom-right" />
        </div>
    );
}

export default App;
