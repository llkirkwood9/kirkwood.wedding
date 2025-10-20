import HomeImage from "../Assets/home.webp";

const HomePage = () => {
    return (
        <div className="min-h-screen flex pt-6 bg-primary text-gray-100">
            <div className="max-w-5xl mx-auto">
                <img src={HomeImage} alt="Kirkwood Wedding" className="max-w-full h-auto" />

                <h1 className="text-3xl font-bold text-center mt-8">
                    JUNE 20, 2026 • BUTLER, PA, USA
                </h1>

                <hr className="my-8" />

                <div className="grid grid-cols-1 md:grid-cols-2 mt-8 text-center">
                    <span className="font-bold text-lg text-center">Wedding Day</span>
                    <span className="font-bold text-lg text-center">Ceremony & Reception</span>

                    <span className="text-lg text-center">Saturday, June 20, 2026</span>
                    <span className="text-lg text-center">
                        Pinehall at Eisler Farms <br />
                        517 Dick Road, Butler PA, 16001
                    </span>
                </div>

                <hr className="my-8" />

                <p className="text-center text-lg">
                    SHARE YOUR MEMORIES WITH #ONCEUPONAKIRKWOOD AND #KIRKWOODFOREVERMORE
                </p>

                <hr className="my-8" />

                <p className="text-center">
                    Questions? Email{" "}
                    <a href="mailto:contact@kirkwood.wedding" className="text-blue-200">
                        contact@kirkwood.wedding
                    </a>
                </p>
            </div>
        </div>
    );
};

export default HomePage;
