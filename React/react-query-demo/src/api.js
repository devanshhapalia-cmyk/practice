import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

export const fetchPosts = async (page = 1) => {
  const res = await api.get(`/posts?_limit=5&_page=${page}`)
  return res.data
}

export const addPost = async (post) => {
  const res = await api.post('/posts', post)
  return res.data
}

export const updatePost = async (post) => {
  const res = await api.put(`/posts/${post.id}`, post)
  return res.data
}

export const deletePost = async (id) => {
  await api.delete(`/posts/${id}`)
  return id
}
