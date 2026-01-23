import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchPosts, addPost, updatePost, deletePost } from './api'
import { useState } from 'react'

export default function App() {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [title, setTitle] = useState('')
  const [editingPost, setEditingPost] = useState(null)

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => fetchPosts(page),
  })

  const addMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setTitle('')
    },
  })

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setEditingPost(null)
      setTitle('')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  if (isLoading) return <h2>Loading posts...</h2>

  if (isError)
    return (
      <div>
        <h2>Error loading posts</h2>
        <p>{error.message}</p>
        <button onClick={refetch}>Retry</button>
      </div>
    )

  return (
    <div style={{ padding: 20 }}>
      <h1>React Query CRUD</h1>

      {/* Add / Edit Form */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />

      {editingPost ? (
        <button
          disabled={updateMutation.isPending}
          onClick={() => updateMutation.mutate({ ...editingPost, title })}
        >
          {updateMutation.isPending ? 'Updating...' : 'Update'}
        </button>
      ) : (
        <button
          disabled={addMutation.isPending}
          onClick={() =>
            addMutation.mutate({ title, body: 'Test body', userId: 1 })
          }
        >
          {addMutation.isPending ? 'Adding...' : 'Add'}
        </button>
      )}

      {/* Mutation errors */}
      {addMutation.isError && (
        <p style={{ color: 'red' }}>
          Add failed: {addMutation.error.message}
        </p>
      )}

      {updateMutation.isError && (
        <p style={{ color: 'red' }}>
          Update failed: {updateMutation.error.message}
        </p>
      )}

      {deleteMutation.isError && (
        <p style={{ color: 'red' }}>
          Delete failed: {deleteMutation.error.message}
        </p>
      )}

      <hr />

      {data.map((post) => (
        <div
          key={post.id}
          style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}
        >
          <h3>{post.title}</h3>

          <button
            onClick={() => {
              setEditingPost(post)
              setTitle(post.title)
            }}
          >
            Edit
          </button>

          <button
            disabled={deleteMutation.isPending}
            onClick={() => deleteMutation.mutate(post.id)}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      ))}

      <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
        Prev
      </button>
      <button onClick={() => setPage((p) => p + 1)}>Next</button>
    </div>
  )
}
