import axios from "axios";

const api = axios.create({
    baseURL : "http://local.host:8081",
    timeout : 5000,
    // withCredentials : true,   쿠키 인증 사용하는 경우
});

export default api;