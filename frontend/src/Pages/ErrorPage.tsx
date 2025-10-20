import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import { Toast } from "../Lib/Toast";

type Props = {
    errorCode?: number;
    errorMessage?: string;
    exception?: string;
};

const ErrorPage = (props: Props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = (location.state as any) || {};
    const errorCode = state.errorCode || props.errorCode || 500;
    const errorMessage = state.errorMessage || props.errorMessage || "Unknown error";
    const exception = state.exception || props.exception;

    return (
        <div className="flex flex-col items-center justify-center flex-1 min-h-0 bg-primary text-gray-100 px-6">
            <h1 className="text-8xl font-extrabold tracking-tight text-gray-300">{errorCode}</h1>
            <p className="mt-4 text-lg text-gray-200">{errorMessage}</p>
            {exception && (
                <div className="items-center justify-center max-w-full">
                    <h2 className="mt-4 text-lg font-semibold text-gray-300 justify-center text-center">
                        Error:
                    </h2>
                    <div className="flex items-start gap-2 mt-4">
                        <pre className="p-4 bg-gray-100 dark:bg-gray-800 text-sm rounded-lg overflow-x-auto max-w-full flex-1">
                            {errorMessage && <>{errorMessage} - </>} {exception}
                        </pre>
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(exception || "");
                                Toast.Success("Error copied to clipboard");
                            }}
                            icon="fa-solid fa-copy"
                            text="Copy"
                            className="h-fit mt-1"
                        />
                    </div>
                </div>
            )}

            <Button
                onClick={() => navigate(-1)}
                icon="fa-solid fa-arrow-left"
                text="Go Back"
                className="mt-6"
            />
        </div>
    );
};

export default ErrorPage;
