import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:5000/v1/api/",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});
