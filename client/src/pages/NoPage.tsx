function NoPage() {
    return (
        <div className="h-screen text-center flex flex-col justify-center items-center">
            <h2 className="text-4xl text-red-500">Page not found</h2>
            <a href="/" className="text-blue-600 hover:underline">
                Go back to portfolio
            </a>
        </div>
    );
}

export default NoPage;
