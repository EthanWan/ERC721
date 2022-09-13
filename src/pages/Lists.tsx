import { useNavigate } from 'react-router-dom'
import ECard from '../components/ECard'

function Lists() {
  const navigate = useNavigate()
  return (
    <div className='w-full'>
      <ECard
        onClick={() => {
          navigate('/detail')
        }}
      />
      <ECard />
      <ECard />
      <ECard />
      <ECard />
      <ECard />
    </div>
  )
}

export default Lists
