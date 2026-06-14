import axios from "axios";

// Get API URL from env
const API_URL = import.meta.env.VITE_API_URL;

// Include cookies in requests
axios.defaults.withCredentials = true;