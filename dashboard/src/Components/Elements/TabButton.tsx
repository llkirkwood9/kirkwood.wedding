/**
 * Tab button wrapper component created to minimize duplicate css styling
 */

type Props = {
    isActive: boolean;
    text?: string;
    isDisabled?: boolean;
    type?: "submit" | "reset" | "button" | undefined;
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
};

const TabButton = (props: Props) => {
    return (
        <button
            disabled={props.isDisabled}
            onClick={props.onClick}
            type={props.type}
            className={`px-4 py-2 -mb-px border-b-2 font-medium transition-colors ${
                props.isActive
                    ? "border-gray-100 text-gray-100"
                    : "border-transparent hover:border-gray-300 hover:text-gray-300"
            }`}
        >
            {props.text}
            {props.children}
        </button>
    );
};

export default TabButton;
