import HomeImage from "../Assets/home.webp";
import Footer from "../Components/Footer";

const HomePage = () => {
    return (
        <div className="pt-16 min-h-screen bg-primary text-gray-100 p-6 transition-colors">
            <div className="max-w-5xl mx-auto">
                <img src={HomeImage} alt="Kirkwood Wedding" className="max-w-full h-auto" />

                <h1 className="text-3xl font-bold text-center mt-8">
                    JUNE 20, 2026 • BUTLER, PA, USA
                </h1>

                <hr className="my-8" />

                <div className="grid grid-cols-1 md:grid-cols-2 mt-8 text-center space-y-3 md:space-y-0">
                    <p>
                        <span className="font-bold text-lg text-center">Wedding Day</span>
                        <br />
                        <span className="text-lg text-center">Saturday, June 20, 2026</span>
                    </p>

                    <p>
                        <span className="font-bold text-lg text-center">Ceremony & Reception</span>
                        <br />
                        <span className="text-lg text-center">
                            Pinehall at Eisler Farms <br />
                            517 Dick Road, Butler PA, 16001
                        </span>
                    </p>
                </div>

                <hr className="my-8" />

                <p className="text-center text-lg">
                    SHARE YOUR MEMORIES WITH #ONCEUPONAKIRKWOOD AND #KIRKWOODFOREVERMORE
                </p>

                <Footer />
            </div>
        </div>
    );
};

export default HomePage;
