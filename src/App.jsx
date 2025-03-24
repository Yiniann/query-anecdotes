import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { getAll, updateAnecdote} from './requests'

const App = () => {
  const queryClient =useQueryClient() 
  const voteMutation = useMutation({
    mutationFn : updateAnecdote,
    onSuccess : ()=>{queryClient.invalidateQueries({queryKey:['anecdotes']})}
  })

  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    voteMutation.mutate(updatedAnecdote)
  }


  const result = useQuery({
    queryKey :['anecdotes'],
    queryFn : getAll
  }) 
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading){
    return <div>loading data...</div>
  }
  
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
