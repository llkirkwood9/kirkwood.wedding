import { useLocation, useNavigate } from "react-router-dom";
import ourwedding from "../Assets/our_wedding.png";
import Button from "./Button";
import TabButton from "./TabButton";

const Heading = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const weddingDate = new Date("2026-06-20T00:00:00");
    const daysUntilWedding = Math.ceil(
        (weddingDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    return (
        <div className="bg-primary text-gray-100 w-full z-50">
            <img src={ourwedding} alt="Our Wedding" className="block mx-auto mb-8" />

            <h2 className="text-6xl font-semibold text-center pb-4">RACHEL & LOGAN</h2>

            <h3 className="text-2xl text-center">June 20, 2026 • Butler, PA, USA</h3>

            <h3 className="text-xl text-center">{daysUntilWedding} DAYS TO GO!</h3>

            <div className="justify-center flex mt-4">
                <Button text="RSVP" icon="fa-solid fa-envelope" className="mx-auto" />
            </div>

            {/* Navigation */}
            <div className="flex justify-center mt-8 space-x-3">
                <TabButton isActive={currentPath === "/"} text="Home" onClick={() => navigate("/")} />
                <TabButton isActive={currentPath === "/our-story"} text="Our Story" onClick={() => navigate("/our-story")} />
                <TabButton isActive={currentPath === "/photos"} text="Photos" onClick={() => navigate("/photos")} />
                <TabButton isActive={currentPath === "/wedding-party"} text="Wedding Party" onClick={() => navigate("/wedding-party")} />
                <TabButton isActive={currentPath === "/q-and-a"} text="Q + A" onClick={() => navigate("/q-and-a")} />
                <TabButton isActive={currentPath === "/travel"} text="Travel" onClick={() => navigate("/travel")} />
                <TabButton isActive={currentPath === "/things-to-do"} text="Things To Do" onClick={() => navigate("/things-to-do")} />
                <TabButton isActive={currentPath === "/registry"} text="Registry" onClick={() => navigate("/registry")} />
            </div>
        </div>
    );
};

export default Heading;
