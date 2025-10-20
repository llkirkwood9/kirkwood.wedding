import Footer from "../Components/Footer";
import Image1 from "../Assets/image_1.webp";
import Image2 from "../Assets/image_2.webp";
import Image3 from "../Assets/image_3.webp";
import Image4 from "../Assets/image_4.webp";
import Image5 from "../Assets/image_5.webp";
import Image6 from "../Assets/image_6.webp";
import Image7 from "../Assets/image_7.webp";
import Image8 from "../Assets/image_8.webp";
import Image9 from "../Assets/image_9.webp";

const PhotosPage = () => {
    return (
        <div className="pt-8 min-h-screen bg-primary text-gray-100 p-6 transition-colors">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto flex flex-wrap items-center justify-center gap-4">
                    <img
                        className="w-64 object-cover rounded shadow"
                        src={Image1}
                        alt="Engagement photo 1"
                        loading="lazy"
                    />
                    <img
                        className="w-64 object-cover rounded shadow"
                        src={Image2}
                        alt="Engagement photo 2"
                        loading="lazy"
                    />
                    <img
                        className="w-64 object-cover rounded shadow"
                        src={Image3}
                        alt="Engagement photo 3"
                        loading="lazy"
                    />
                    <img
                        className="w-64 object-cover rounded shadow"
                        src={Image4}
                        alt="Engagement photo 4"
                        loading="lazy"
                    />
                    <img
                        className="w-64 object-cover rounded shadow"
                        src={Image5}
                        alt="Engagement photo 5"
                        loading="lazy"
                    />
                    <img
                        className="w-64 object-cover rounded shadow"
                        src={Image6}
                        alt="Engagement photo 6"
                        loading="lazy"
                    />
                    <img
                        className="w-64 object-cover rounded shadow"
                        src={Image7}
                        alt="Engagement photo 7"
                        loading="lazy"
                    />
                    <img
                        className="w-64 object-cover rounded shadow"
                        src={Image8}
                        alt="Engagement photo 8"
                        loading="lazy"
                    />
                    <img
                        className="w-64 object-cover rounded shadow"
                        src={Image9}
                        alt="Engagement photo 9"
                        loading="lazy"
                    />
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default PhotosPage;
