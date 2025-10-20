import Footer from "../Components/Footer";

const QAPage = () => {
    return (
        <div className="pt-8 min-h-screen bg-primary text-gray-100 p-6 transition-colors">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-xl font-bold text-center mb-6">Are kids invited?</h1>
                <p className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-lg text-center">
                    Although we love your little ones, we have decided to keep our wedding and
                    reception mainly an adult event with the exception of a few kiddos (10+). We
                    hope you'll take this opportunity to enjoy a date night and we appreciate you
                    making prior arrangements!
                </p>

                <h1 className="text-xl font-bold text-center mb-6 mt-10">Can I bring a guest?</h1>
                <p className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-lg text-center">
                    Although we would love for everyone to bring a guest, we have a strict guest
                    list to stay on budget and meet our venue restrictions. We appreciate your
                    understanding and look forward to celebrating with you!
                </p>

                <h1 className="text-xl font-bold text-center mb-6 mt-10">
                    Where are the ceremony and reception taking place?
                </h1>
                <p className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-lg text-center">
                    Both the ceremony and the reception are taking place at Pinehall at Eisler
                    Farms.
                </p>

                <h1 className="text-xl font-bold text-center mb-6 mt-10">
                    Will the ceremony cocktail hour, and reception take place indoors or outdoors?
                </h1>
                <p className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-lg text-center">
                    All three events have the potential to be inside and/or outside.
                </p>

                <h1 className="text-xl font-bold text-center mb-6 mt-10">
                    What is the dress code?
                </h1>
                <p className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-lg text-center">
                    Our dress code is under the umbrella of semi-formal. Some examples are cocktail
                    dresses, jumpsuits, suits, nice shirt and dress pants, etc. Please keep in mind
                    that the ceremony and reception are going to be at Pinehall, which is a barn.
                    Activities will be both indoor and outdoor. All colors EXCLUDING WHITE are
                    encouraged!
                </p>

                <h1 className="text-xl font-bold text-center mb-6 mt-10">
                    I have dietary dietary restrictions/allergies. What is the best way to let you
                    know?
                </h1>
                <p className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-lg text-center">
                    The best way to let us know about your dietary restriction/allergies is to
                    provide them to us through your RSPV form.
                </p>

                <h1 className="text-xl font-bold text-center mb-6 mt-10">
                    Do you have a gift registry?
                </h1>
                <p className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-lg text-center">
                    Your presence at our wedding is present enough! However, for friends and family
                    who have expressed an interest, we've created an online registry. Click on the
                    "Registry" tab of this website to take a look. Should you wish to bring a gift
                    to our wedding, there will be a gift table for your convenience.
                </p>

                <h1 className="text-xl font-bold text-center mb-6 mt-10">
                    Do you have a wedding hashtag?
                </h1>
                <p className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-lg text-center">
                    Yes! We have two wedding hashtag options for you. They are #KirkwoodForEvermore
                    and #OnceUponAKirkwood! Please feel free to use these!
                </p>

                <Footer />
            </div>
        </div>
    );
};

export default QAPage;
