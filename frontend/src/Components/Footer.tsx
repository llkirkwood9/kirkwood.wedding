import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <hr className="my-8" />

            <p className="text-center mb-4">
                Questions? Email{" "}
                <a href="mailto:contact@kirkwood.wedding" className="text-blue-200">
                    contact@kirkwood.wedding
                </a>
            </p>

            <div className="flex items-center justify-center mb-2">
                <div className="text-6xl text-center border-b-2">R & L</div>
                <br />
            </div>
            <div className="flex items-center justify-center mb-7">6.20.2026</div>

            <div className="flex items-center justify-center mb-1 text-xs">
                <Link to="/login" className="mx-2 text-blue-200">
                    Admin Login
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
