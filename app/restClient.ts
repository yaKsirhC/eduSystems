import axios, { Axios } from "axios";

axios.defaults.baseURL = "/api";
axios.defaults.withCredentials = true;

const http = axios
export default http