import cookies from "./cookies";

interface FetchDataProps {
    url: string;
    headers?: Record<string, string>;
}
const fetchData = async ({ url, headers }: FetchDataProps) => {
    const config = { method: "GET", headers: { ...headers } };
    try {
        const response = await fetch(url, config);
        const data = await response.json();
        return data;
    } catch (e) {
        console.error("Failed to fetch data", e);
        return [];
    }
};

const deleteData = async (url: string) => {
    console.log("trying to delte..", url);
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${cookies.get("TOKEN")}`,
            },
        });
        console.log("response", response);
        return response.ok;
    } catch (e) {
        console.error("Failed to delete data", e);
        return false;
    }
};

export { fetchData, deleteData };
