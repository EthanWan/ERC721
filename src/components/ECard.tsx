interface ECardProps {
  title?: string
  onClick?: () => void
}

export default function ECard(props: ECardProps) {
  const { title, onClick } = props
  return (
    <div
      className='lg:w-2/12 md:w-4/12 sm:w-full inline-block m-4 cursor-pointer'
      onClick={onClick}
    >
      <img src={require('../assets/logo.jpg')} alt='no img' className='rounded-t-lg' />
      <div className='bg-emerald-600 h-12 rounded-b-lg'>
        <span>{title}</span>
      </div>
    </div>
  )
}
