import Button from "./Button";

type Props = {
    promptText: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmButtonIcon?: any;
    cancelButtonIcon?: any;
    confirmButtonClassName?: string;
    cancelButtonClassName?: string;
};

const ConfirmationModal = (props: Props) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-lg w-full max-w-md">
                <div className="flex items-center">
                    <h2 className="flex text-lg font-semibold mb-4">{props.promptText}</h2>
                </div>

                <div className="mt-6 flex justify-end space-x-2">
                    <Button
                        className={`px-4 py-2 rounded-lg ${props.cancelButtonClassName}`}
                        text={props.cancelText}
                        icon={props.cancelButtonIcon}
                        onClick={props.onCancel}
                    />
                    <Button
                        className={`px-4 py-2 rounded-lg ${props.confirmButtonClassName}`}
                        text={props.confirmText}
                        icon={props.confirmButtonIcon}
                        onClick={props.onConfirm}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
