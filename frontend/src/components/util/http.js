export const sendRequest = async (endpoint, method = "GET", data = {}) => {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (method !== "GET") {
      options.body = JSON.stringify(data);
    }
  
    const response = await fetch(`http://localhost:5000/api/user/signup${endpoint}`, options);
    const responseData = await response.json();
  
    if (!response.ok) {
      throw new Error(responseData.message || "Something went wrong!");
    }
  
    return responseData;
  };
  