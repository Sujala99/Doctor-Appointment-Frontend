import axios from "axios";
// Function to retrieve the auth token
export const getAuthToken = () => {
  return localStorage.getItem("authToken"); // Adjust based on your auth logic
};

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:4000", // Replace with your actual API URL
});

// Set the authorization token for every request
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Function to fetch sidebar users
export const fetchSidebarUsers = () => {
  return apiClient.get("/users/chatuser");
};

// Function to fetch messages for a user
export const fetchMessages = (receiverId) => {
  return apiClient.get(`/message/${receiverId}`);
};
