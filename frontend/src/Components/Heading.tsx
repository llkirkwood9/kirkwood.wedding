import { Link, useLocation, useNavigate } from "react-router-dom";
import ourwedding from "../Assets/our_wedding.png";
import Button from "./Button";
import TabButton from "./TabButton";
import Icon from "./Icon";
import { useEffect, useRef, useState } from "react";

const Heading = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const weddingDate = new Date("2026-06-20T00:00:00");
    const daysUntilWedding = Math.ceil(
        (weddingDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    const handleAddToCalendar = () => {
        const title = "Rachel & Logan Wedding";
        const locationStr = "Pinehall at Eisler Farms 517 Dick Road, Butler PA, 16001";
        const description = "Join us for Rachel & Logan's wedding on June 20, 2026.";

        // All-day event: DTSTART is the day, DTEND is the next day (exclusive)
        const dtStart = "20260620";
        const dtEnd = "20260621";

        const uid = `kirkwood-wedding-${Date.now()}@kirkwood.wedding`;
        const dtstamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

        const icsLines = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//kirkwood.wedding//EN",
            "BEGIN:VEVENT",
            `UID:${uid}`,
            `DTSTAMP:${dtstamp}`,
            `DTSTART;VALUE=DATE:${dtStart}`,
            `DTEND;VALUE=DATE:${dtEnd}`,
            `SUMMARY:${title}`,
            `LOCATION:${locationStr}`,
            `DESCRIPTION:${description}`,
            "END:VEVENT",
            "END:VCALENDAR",
        ].join("\r\n");

        const blob = new Blob([icsLines], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "Rachel-Logan-Wedding.ics";
        document.body.appendChild(a);
        a.click();
        a.remove();

        // Revoke URL shortly after download
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    };

    // Close mobile dropdown when clicking outside
    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            // Ignore clicks on the menu button itself to prevent immediate reopen on mousedown
            if (menuButtonRef.current && menuButtonRef.current.contains(target)) {
                return;
            }
            if (dropdownRef.current && !dropdownRef.current.contains(target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="bg-primary text-gray-100 w-full z-50 overflow-x-hidden">
            <div className="w-full justify-right flex visible md:invisible">
                {/* Mobile Menu Button */}
                <button
                    ref={menuButtonRef}
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="ml-auto text-gray-100 hover:text-gray-300 focus:outline-none text-xl"
                >
                    {isOpen ? <Icon icon="fa-solid fa-xmark" /> : <Icon icon="fa-solid fa-bars" />}
                </button>
            </div>

            <Link to="/">
                <img
                    src={ourwedding}
                    alt="Our Wedding"
                    className="block mx-auto mb-8 max-w-full h-auto"
                />
            </Link>

            <h2 className="text-6xl font-semibold text-center pb-4">RACHEL & LOGAN</h2>

            <h3
                className="text-2xl text-center cursor-pointer underline hover:opacity-90"
                role="button"
                tabIndex={0}
                onClick={handleAddToCalendar}
                title="Add wedding to your calendar"
            >
                June 20, 2026 • Butler, PA, USA
            </h3>

            <h3 className="text-xl text-center">{daysUntilWedding} DAYS TO GO!</h3>

            <div className="justify-center flex mt-4">
                <Button
                    text="RSVP"
                    icon="fa-solid fa-envelope"
                    className="mx-auto"
                    onClick={() => navigate("/rsvp")}
                />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex justify-center md:mt-8 md:mb-1 space-x-3">
                <TabButton
                    isActive={currentPath === "/"}
                    text="Home"
                    onClick={() => navigate("/")}
                />
                <TabButton
                    isActive={currentPath === "/our-story"}
                    text="Our Story"
                    onClick={() => navigate("/our-story")}
                />
                <TabButton
                    isActive={currentPath === "/photos"}
                    text="Photos"
                    onClick={() => navigate("/photos")}
                />
                <TabButton
                    isActive={currentPath === "/wedding-party"}
                    text="Wedding Party"
                    onClick={() => navigate("/wedding-party")}
                />
                <TabButton
                    isActive={currentPath === "/q-and-a"}
                    text="Q + A"
                    onClick={() => navigate("/q-and-a")}
                />
                <TabButton
                    isActive={currentPath === "/travel"}
                    text="Travel"
                    onClick={() => navigate("/travel")}
                />
                <TabButton
                    isActive={currentPath === "/things-to-do"}
                    text="Things To Do"
                    onClick={() => navigate("/things-to-do")}
                />
                <TabButton
                    isActive={currentPath === "/registry"}
                    text="Registry"
                    onClick={() => navigate("/registry")}
                />
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="bg-white shadow-lg fixed top-8 left-0 w-full z-50 flex flex-col items-center py-4"
                >
                    <Button
                        onClick={() => {
                            setIsOpen(false);
                            navigate("/");
                        }}
                        className="w-11/12 text-lg py-3 mb-2 rounded-lg transition items-center justify-center"
                        text="Home"
                        icon="fa-solid fa-home"
                    />
                    <Button
                        onClick={() => {
                            setIsOpen(false);
                            navigate("/our-story");
                        }}
                        className="w-11/12 text-lg py-3 mb-2 rounded-lg transition items-center justify-center"
                        text="Our Story"
                        icon="fa-solid fa-book"
                    />
                    <Button
                        onClick={() => {
                            setIsOpen(false);
                            navigate("/photos");
                        }}
                        className="w-11/12 text-lg py-3 mb-2 rounded-lg transition items-center justify-center"
                        text="Photos"
                        icon="fa-solid fa-camera"
                    />
                    <Button
                        onClick={() => {
                            setIsOpen(false);
                            navigate("/wedding-party");
                        }}
                        className="w-11/12 text-lg py-3 mb-2 rounded-lg transition items-center justify-center"
                        text="Wedding Party"
                        icon="fa-solid fa-users"
                    />
                    <Button
                        onClick={() => {
                            setIsOpen(false);
                            navigate("/q-and-a");
                        }}
                        className="w-11/12 text-lg py-3 mb-2 rounded-lg transition items-center justify-center"
                        text="Q + A"
                        icon="fa-solid fa-question"
                    />
                    <Button
                        onClick={() => {
                            setIsOpen(false);
                            navigate("/travel");
                        }}
                        className="w-11/12 text-lg py-3 mb-2 rounded-lg transition items-center justify-center"
                        text="Travel"
                        icon="fa-solid fa-plane"
                    />
                    <Button
                        onClick={() => {
                            setIsOpen(false);
                            navigate("/things-to-do");
                        }}
                        className="w-11/12 text-lg py-3 mb-2 rounded-lg transition items-center justify-center"
                        text="Things To Do"
                        icon="fa-solid fa-umbrella-beach"
                    />
                    <Button
                        onClick={() => {
                            setIsOpen(false);
                            navigate("/registry");
                        }}
                        className="w-11/12 text-lg py-3 mb-2 rounded-lg transition items-center justify-center"
                        text="Registry"
                        icon="fa-solid fa-gift"
                    />
                </div>
            )}
        </div>
    );
};

export default Heading;
