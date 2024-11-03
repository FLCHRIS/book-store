export const POST = async (url, body, useCookie = false) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: useCookie ? "include" : "omit",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      const errorMessage = error.message || "Something went wrong";
      throw new Error(errorMessage);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("There is no service. Please try again later.");
    } else {
      throw error;
    }
  }
};

export const GET = async (url, useCookie = false) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: useCookie ? "include" : "omit",
    });

    if (!response.ok) {
      const error = await response.json();
      const errorMessage = error.message || "Something went wrong";
      throw new Error(errorMessage);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("There is no service. Please try again later.");
    } else {
      throw error;
    }
  }
};
