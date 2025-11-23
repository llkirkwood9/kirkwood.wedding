import Footer from "../Components/Footer";
import Hotel from "../Components/Hotel";

const TravelPage = () => {
    return (
        <div className="pt-8 min-h-screen bg-primary text-gray-100 p-6 transition-colors">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Hotel
                    name="Springhill Suites by Marriott Pittsburgh Butler/Centre City"
                    address="125 E Jefferson Street, Butler, PA, 16001"
                    imageUrl="https://media-cdn.tripadvisor.com/media/photo-s/2c/16/6d/f1/exterior.jpg"
                    websiteUrl="https://www.marriott.com/en-us/hotels/pitut-springhill-suites-pittsburgh-butler-centre-city/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0"
                />

                <Hotel
                    name="Fairfield Inn and Suites by Marriott Butler"
                    address="200 Fairfield Ln, Butler, PA, 16001"
                    imageUrl="https://cache.marriott.com/is/image/marriotts7prod/fi-pitbt-exterior-night-37692:Wide-Hor?wid=1336&fit=constrain"
                    websiteUrl="https://www.marriott.com/en-us/hotels/pitbt-fairfield-inn-and-suites-butler/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0"
                />

                <Hotel
                    name="Super 8 by Wyndham Butler"
                    address="138 Pittsburgh Rd, Butler, PA 16001"
                    imageUrl="https://www.wyndhamhotels.com/content/dam/property-images/en-us/se/us/pa/new-castle/03745/03745_exterior_view_1.jpg?downsize=720:*"
                    websiteUrl="https://www.wyndhamhotels.com/hotels/butler-pennsylvania?brand_id=SE"
                />

                <Hotel
                    name="Holiday Inn Express & Suites Butler by IHG"
                    address="203 N Duffy Rd, Butler, PA 16001"
                    imageUrl="https://digital.ihg.com/is/image/ihg/holiday-inn-express-and-suites-butler-3863887551-original"
                    websiteUrl="https://www.ihg.com/holidayinnexpress/hotels/us/en/butler/pitbr/hoteldetail?cm_mmc=GoogleMaps-_-EX-_-US-_-PITBR"
                />

                <Hotel
                    name="Hampton Inn Butler"
                    address="400 Benevan Square, Butler, PA 16001"
                    imageUrl="https://www.hilton.com/im/en/BTPNCHX/2463488/butler-64.jpg?impolicy=crop&cw=5472&ch=3063&gravity=NorthWest&xposition=0&yposition=292&rw=768&rh=430"
                    websiteUrl="https://www.hilton.com/en/hotels/btpnchx-hampton-butler/?SEO_id=GMB-AMER-HX-BTPNCHX&y_source=1_MjA4NDY2NS03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D"
                />

                <Hotel
                    name="Comfort Inn & Suites Butler"
                    address="1 Comfort Ln, Butler, PA 16001"
                    imageUrl="https://cf.bstatic.com/xdata/images/hotel/max1024x768/271434538.jpg?k=56e2518eae05581c7647a2acefe2b3b9e49bef27f2745e504b1615fecab37c0c&o=&hp=1"
                    websiteUrl="https://www.choicehotels.com/pennsylvania/butler/comfort-inn-hotels/pa432?mc=llgoxxpx"
                />

                <Footer />
            </div>
        </div>
    );
};

export default TravelPage;
