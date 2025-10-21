import Button from "./Button";

type Props = {
    name: string;
    address: string;
    phoneNumber: string;
    imageUrl: string;
    websiteUrl: string;
};

const ActivityOption = (props: Props) => {
    return (
        <>
            <h1 className="text-xl font-bold text-center mb-6">{props.name}</h1>
            <div className="mx-auto flex flex-wrap items-center justify-center">
                <img src={props.imageUrl} alt={props.name} className="w-96 object-cover rounded" />
            </div>
            <p className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-lg text-center">
                {props.address}
            </p>
            <p className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-lg text-center">
                {props.phoneNumber}
            </p>
            <div className="items-center justify-center flex mb-4">
                <Button
                    className="mx-auto"
                    text="Website"
                    onClick={() => {
                        window.open(props.websiteUrl, "_blank");
                    }}
                />
            </div>
        </>
    );
};

export default ActivityOption;
