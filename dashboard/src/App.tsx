import { ToastContainer } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
import { setNavigateFunction } from "./Lib/ErrorHandler";
import { useTheme } from "./Hooks/UseTheme";
import Navbar from "./Components/Navbar/Navbar";

function App() {
    useTheme();
    const navigate = useNavigate();
    setNavigateFunction(navigate);

    return (
        <>
            <Navbar />
            <Outlet />
            <ToastContainer position="bottom-right" />
        </>
    );
}

export default App;
