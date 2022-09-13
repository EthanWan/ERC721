interface ECardProps {
  title?: string
}

export default function ECard(props: ECardProps) {
  const { title } = props
  return (
    <div className='lg:w-2/12 md:w-4/12 sm:w-full inline-block m-4'>
      <img src={require('../assets/logo.jpg')} alt='no img' className='rounded-t-lg' />
      <div className='bg-emerald-600 h-12 rounded-b-lg'>
        <span>{title}</span>
      </div>
    </div>
  )
}
