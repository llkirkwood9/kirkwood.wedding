const ListSkeleton = () => {
    return (
        <ul className="space-y-2">
            {[...Array(5)].map((_, i) => (
                <li
                    key={i}
                    className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-700 animate-pulse flex flex-col sm:flex-row sm:justify-between sm:items-center"
                >
                    <div>
                        <div className="h-4 w-32 bg-zinc-300 dark:bg-zinc-600 rounded mb-2"></div>
                        <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-500 rounded mb-1"></div>
                        <div className="h-3 w-40 bg-zinc-200 dark:bg-zinc-500 rounded"></div>
                    </div>
                    <div className="flex space-x-2">
                        <div className="h-8 w-20 bg-zinc-300 dark:bg-zinc-600 rounded"></div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ListSkeleton;
