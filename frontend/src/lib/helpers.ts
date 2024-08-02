import toast from "react-hot-toast";

export async function fetchData<T>(data: T, route: string) {
    try {
        const response = await fetch(route, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data.");
        }

        return response.json();

    }
    catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data. Please try again.");
    }
}
