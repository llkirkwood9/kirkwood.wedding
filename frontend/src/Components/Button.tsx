/**
 * Button wrapper component created to minimize duplicate css styling
 */

import Icon from "./Icon";

type Props = {
    text?: string;
    isDisabled?: boolean;
    icon?: any;
    type?: "submit" | "reset" | "button" | undefined;
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
};

const Button = (props: Props) => {
    return (
        <button
            disabled={props.isDisabled}
            onClick={props.onClick}
            type={props.type}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-100 text-primary 
            hover:bg-gray-200 transition-all disabled:bg-gray-400 ${props.className}`}
        >
            {props.icon && <Icon icon={props.icon} />}
            {props.text}
            {props.children}
        </button>
    );
};

export default Button;
