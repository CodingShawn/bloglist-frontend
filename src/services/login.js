import axios from "axios";
const baseUrl = "api/login";

async function login(credentials) {
  let response = await axios.post(baseUrl, credentials);
  return response.data;
}

export default { login };
