interface ECardProps {
  title?: string
  onClick?: () => void
}

export default function ECard(props: ECardProps) {
  const { title, onClick } = props
  return (
    <div className='cursor-pointer' onClick={onClick}>
      <img
        src={
          'https://ipfs.io/ipfs/bafybeiewr2z3hivmps5rtxl4pcd3fzugwildwqqrhp6lwkprfguwj7isqq/logo.jpg'
        }
        alt='no img'
        className='rounded-t-lg'
      />
      <div className='bg-emerald-600 h-12 rounded-b-lg'>
        <span>{title}</span>
      </div>
    </div>
  )
}
