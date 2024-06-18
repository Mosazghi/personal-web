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
        const response = await fetch(url, {
            method,
            body: data ? JSON.stringify(data) : undefined,
            headers: { ...defaultHeaders, ...headers },
        });

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
        return false;
    }
};

export { request };
