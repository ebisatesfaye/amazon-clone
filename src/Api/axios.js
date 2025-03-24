import axios from "axios";

const axiosinstance = axios.create({
    //local backend 
    // baseURL : "http://127.0.0.1:5001/clone-b74d3/us-central1/api"
    // baseURL : "http://localhost:5000"
    //backend without firebase functions 
    baseURL : "https://amazon-backend-api-s3ym.onrender.com",
});

export {axiosinstance}