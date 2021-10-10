import axios from "axios";
import { config } from "./config";

const axios_in = axios.create({
  baseURL: config.baseURL,
});
//@ts-ignore
axios_in.defaults.headers.common['Authorization'] = `Token ${config.api_key}`
export default axios_in
