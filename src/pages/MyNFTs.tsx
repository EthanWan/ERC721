import { useNavigate } from 'react-router-dom'
import ECard from '../components/ECard'

function MyNFTs() {
  const navigate = useNavigate()
  return (
    <>
      <div className='w-full p-3 grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4'>
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
    </>
  )
}

export default MyNFTs
