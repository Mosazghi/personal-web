const LoadingCourses = () => {
    return (
        <div className="flex justify-center items-center mt-10 mb-5 md:mt-15">
            <div className=" text-2xl text-white">Fetching courses </div>
            <div className="animate-spin rounded-full h-6 w-6 ms-5 border-t-2 border-b-2"></div>
        </div>
    );
};

export default LoadingCourses;
