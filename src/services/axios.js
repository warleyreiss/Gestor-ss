import axios from "axios";

export const axiosApi = axios.create({
//baseURL: "https://gestor-proativa-7978f02347a9.herokuapp.com",
baseURL: "http://localhost:8080",
});
