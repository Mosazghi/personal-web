const LoadingStatus = ({ message }: { message: string }) => {
    return (
        <div className="flex flex-row justify-center items-center gap-2 text-gray-400">
            <h6 className="text-xl font-medium text-inherit">{message}</h6>
            <div
                className="inline-block h-[18px] w-[18px] animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingStatus;
