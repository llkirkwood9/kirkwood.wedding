import { useLocation } from "react-router-dom";
import ourwedding from "../Assets/our_wedding.png";
import Button from "./Button";
import TabButton from "./TabButton";

const Heading = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const weddingDate = new Date("2026-06-20T00:00:00");
    const daysUntilWedding = Math.ceil(
        (weddingDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    return (
        <div className="bg-primary text-gray-100">
            <img src={ourwedding} alt="Our Wedding" className="block mx-auto mb-8" />

            <h2 className="text-6xl font-semibold text-center pb-4">RACHEL & LOGAN</h2>

            <h3 className="text-2xl text-center">June 20, 2026 • Butler, PA, USA</h3>

            <h3 className="text-xl text-center">{daysUntilWedding} DAYS TO GO!</h3>

            <div className="justify-center flex mt-4">
                <Button text="RSVP" icon="fa-solid fa-envelope" className="mx-auto" />
            </div>

            {/* Navigation */}
            <div className="flex justify-center mt-8 space-x-3">
                <TabButton isActive={currentPath === "/"} text="Home" />
                <TabButton isActive={currentPath === "/our-story"} text="Our Story" />
                <TabButton isActive={currentPath === "/photos"} text="Photos" />
                <TabButton isActive={currentPath === "/wedding-party"} text="Wedding Party" />
                <TabButton isActive={currentPath === "/q-and-a"} text="Q + A" />
                <TabButton isActive={currentPath === "/travel"} text="Travel" />
                <TabButton isActive={currentPath === "/things-to-do"} text="Things To Do" />
                <TabButton isActive={currentPath === "/registry"} text="Registry" />
            </div>
        </div>
    );
};

export default Heading;
