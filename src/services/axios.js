import axios from "axios";

export const axiosApi = axios.create({
baseURL: "https://ss-servicos-868bd9829280.herokuapp.com",
//baseURL: "http://localhost:8080",
});
