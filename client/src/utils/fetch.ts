import cookies from "./cookies";

const fetchData = async (url: string) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${cookies.get("TOKEN")}`,
            },
        });
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
