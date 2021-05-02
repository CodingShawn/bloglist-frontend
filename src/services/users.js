import axios from "axios";
const baseUrl = "/api/users";

async function getUsers() {
  let response = await axios.get(baseUrl);
  return response.data;
}

export default { getUsers };
