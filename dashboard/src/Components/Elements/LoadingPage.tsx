import Icon from "./Icon";

const LoadingPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-zinc-900 dark:text-white">
            <div className="animate-pulse flex flex-col items-center justify-center space-y-8">
                <h1 className="text-8xl font-extrabold mb-2 text-green-600 dark:text-green-400">
                    Loading...
                </h1>
                <Icon icon="fa-solid fa-spinner" className="animate-spin text-6xl mt-4" />
            </div>
        </div>
    );
};

export default LoadingPage;
