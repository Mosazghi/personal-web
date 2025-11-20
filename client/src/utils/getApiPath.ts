const getApiPath = () => {
    return process.env.NEXT_PUBLIC_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_BASE_URL
        : process.env.NEXT_PUBLIC_DEV_BASE_URL;
};

export default getApiPath;
