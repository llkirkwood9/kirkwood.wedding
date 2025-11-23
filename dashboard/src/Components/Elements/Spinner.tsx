import Icon from "./Icon";

type Props = {
    className?: string;
};

const Spinner = (props: Props) => {
    return (
        <div className="flex items-center justify-center">
            <div className="animate-spin">
                <Icon icon="fa-solid fa-spinner" className={props.className} />
            </div>
        </div>
    );
};

export default Spinner;
