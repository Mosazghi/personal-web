interface RequestProps {
    url: string;
    method: string | "GET" | "POST" | "DELETE" | "PUT";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: Record<string, any>;
    headers?: Record<string, string>;
}

const request = async ({ url, method, data, headers }: RequestProps) => {
    const defaultHeaders = {
        "Content-Type": "application/json",
    };

    try {
        console.log("trying to fetch with", { url, method, data, headers });
        const response = await fetch(url, {
            method,
            body: data ? JSON.stringify(data) : undefined,
            headers: { ...defaultHeaders, ...headers },
        });
        console.log("response", response);

        if (response.ok) {
            if (method === "DELETE") {
                return true;
            } else {
                return await response.json();
            }
        } else {
            throw new Error(`Failed to ${method} data`);
        }
    } catch (e) {
        console.error(`Failed to ${method} data`, e);
        return false;
    }
};

export { request };
