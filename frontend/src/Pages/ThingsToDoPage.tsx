import Footer from "../Components/Footer";
import ActivityOption from "../Components/ActivityOption";

const ThingsToDoPage = () => {
    return (
        <div className="pt-8 min-h-screen bg-primary text-gray-100 p-6 transition-colors">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-xl font-bold text-center mb-6">
                    If you are planning to stay in the area for more than our wedding day, here are
                    some great options for you to do in your free time.
                </h1>

                <ActivityOption
                    name="Moraine State Park"
                    address="225 Pleasant Valley Rd, Portersville, PA 16051"
                    phoneNumber="(724) 368-8811"
                    imageUrl="https://s7d9.scene7.com/is/image/statepa/mora_park_photo?ts=1727274972411&dpr=off"
                    websiteUrl="https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/moraine-state-park"
                />

                <ActivityOption
                    name="McConnells Mill State Park"
                    address="1761 McConnells Mill Rd, Portersville, PA 16051"
                    phoneNumber="(724) 368-8091"
                    imageUrl="https://uncoveringpa.com/wp-content/uploads/2018/11/McConnells-Mill-State-Park-001.jpg"
                    websiteUrl="https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/mcconnells-mill-state-park"
                />

                <ActivityOption
                    name="Mystery Mayhem Escapes & Axe Throwing"
                    address="623 Centreville Pike, Slippery Rock, PA 16057"
                    phoneNumber="(724) 541-3533"
                    imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIRLOqSEs0LHGMpPhQqzcHMGjhQf9ySgIObQ&s"
                    websiteUrl="https://mysterymayhemescapes.com/"
                />

                <ActivityOption
                    name="Pittsburgh Zoo & Aquarium"
                    address="7370 Baker St, Pittsburgh, PA 15206"
                    phoneNumber="(412) 665-3640"
                    imageUrl="https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Pittsburgh_Zoo_%26_PPG_Aquarium_logo.svg/1200px-Pittsburgh_Zoo_%26_PPG_Aquarium_logo.svg.png"
                    websiteUrl="https://www.pittsburghzoo.org/"
                />

                <ActivityOption
                    name="Kennywood"
                    address="4800 Kennywood Blvd, West Mifflin, PA 15122"
                    phoneNumber="(412) 461-0500"
                    imageUrl="https://www.kennywood.com/content/dam/knw/logo/kenny-logo-small.png"
                    websiteUrl="https://www.kennywood.com/"
                />

                <ActivityOption
                    name="Carnegie Museum of Natural History"
                    address="4400 Forbes Avenue, Pittsburgh, PA 15213"
                    phoneNumber="(412) 622-3131"
                    imageUrl="https://visit-pittsburgh.imgix.net/images/meta-images/CMNH-Header.jpg?auto=compress%2Cformat&crop=focalpoint&fit=min&fp-x=0.5&fp-y=0.5&h=630&q=80&w=1200&s=e2173dfd4f461fc54957d3d1d7b63da2"
                    websiteUrl="https://www.carnegiemnh.org/"
                />

                <ActivityOption
                    name="The Andy Warhol Museum"
                    address="117 Sandusky Street, Pittsburgh, PA 15212"
                    phoneNumber="(412) 237-8300"
                    imageUrl="https://upload.wikimedia.org/wikipedia/commons/9/99/The_Andy_Warhol_Museum.jpg"
                    websiteUrl="https://www.warhol.org/"
                />

                <Footer />
            </div>
        </div>
    );
};

export default ThingsToDoPage;
