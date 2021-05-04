import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

function setToken(newToken) {
  token = `bearer ${newToken}`;
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

async function create(newBlog) {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
}

async function update(blog) {
  const blogID = blog.id;
  const response = await axios.put(`${baseUrl}/${blogID}`, blog);
  return response.data;
}

async function deleteBlog(blog) {
  const blogID = blog.id;
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${blogID}`, config);
  return blog;
}

async function commentBlog(blog, comment) {
  const blogID = blog.id;
  let response = await axios.post(`${baseUrl}/${blogID}/comments`, comment);
  return response.data;
}

export default { getAll, setToken, create, update, deleteBlog, commentBlog };
