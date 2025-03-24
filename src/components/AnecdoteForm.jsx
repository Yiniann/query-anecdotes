import { createAnecdote } from "../requests"
import { useMutation, useQueryClient } from "@tanstack/react-query"
const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdote = useMutation({
    mutationFn : createAnecdote,
    onSuccess : ()=> queryClient.invalidateQueries({queryKey :['anecdotes']})
  })


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    if (content.length < 5) {
      alert('Anecdote must be at least 5 characters long.')
      return
    }
    newAnecdote.mutate({content,votes:0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
