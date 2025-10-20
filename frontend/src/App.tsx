import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Heading from "./Components/Heading";

function App() {
    return (
        <>
            <Heading />
            <Outlet />
            <ToastContainer position="bottom-right" />
        </>
    );
}

export default App;
