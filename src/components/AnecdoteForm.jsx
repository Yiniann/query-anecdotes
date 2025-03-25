import { createAnecdote } from "../requests"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNotification } from "../notificationContext"

const AnecdoteForm = () => {
  const { dispatch } = useNotification();
  const queryClient = useQueryClient()
  const newAnecdote = useMutation({
    mutationFn : createAnecdote,
    onSuccess : (data)=> {
      queryClient.invalidateQueries({queryKey :['anecdotes']})
      dispatch({ type: 'SHOW', payload: `"${data.content}" have been created` })
      setTimeout(()=>{dispatch({type: 'HIDE'})},5000)
    },
    onError :(error) =>{
      dispatch({type : 'SHOW', payload :`Failed to create anecdote: ${error.message}`})
      setTimeout(()=>{dispatch({type:'HIDE'})},5000)
    }
  })


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    if (content.length < 5) {
      dispatch({ type: 'SHOW', payload: 'Anecdote must be at least 5 characters long.' })
      setTimeout(() => { dispatch({ type: 'HIDE' }) }, 5000)
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
