import { useWeb3React } from '@web3-react/core'
import { useNavigate } from 'react-router-dom'

function App() {
  const { connector, chainId, account, isActive } = useWeb3React()
  const navigate = useNavigate()

  const connectWallet = () => {
    if (!isActive) {
      connector.activate()
    }
  }

  if (chainId && chainId != 3) {
    console.error('Change to test network!')
  }

  return (
    <header className='relative z-50 w-full flex-none text-sm font-semibold leading-6 text-slate-900'>
      <nav className='mx-auto max-w-container px-4 sm:px-6 lg:px-8'>
        <div className='relative flex items-center py-[2.125rem]'>
          <div className='mr-auto flex-none text-slate-900'>Logo</div>
          <div className='hidden lg:ml-8 lg:flex lg:items-center lg:border-slate-900/15 lg:pl-8'>
            <a
              onClick={() => {
                navigate('/create')
              }}
            >
              Create
            </a>
            <a
              onClick={connectWallet}
              className='inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 -my-2.5 ml-8 cursor-pointer'
            >
              <span>
                {account
                  ? account.replace(/^(0x.{4})(.*)(.{4})/, '$1...$3')
                  : 'Connect Wallet'}
                {!account && <span> →</span>}
              </span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default App
