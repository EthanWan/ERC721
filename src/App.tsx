import { useWeb3React } from '@web3-react/core'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { ethers } from 'ethers'
// import type { ExternalProvider } from 'ethers'
import MenuBtn from './components/EMenu'
import Create from './pages/Create'
import Lists from './pages/Lists'
import Detail from './pages/Detail'

function App() {
  const { connector, chainId, account, isActive, provider } = useWeb3React()
  // console.log(provider)
  if (provider) {
    const provider2 = new ethers.providers.Web3Provider(provider.provider)
    provider2.getBalance(account as string).then(balance => {
      console.log(ethers.utils.formatEther(balance))
    })

    provider2.getBlockNumber().then(res => {
      console.log(res)
    })
  }

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
    <div>
      <header className='relative z-50 w-full flex-none text-sm font-semibold leading-6 text-slate-900 shadow shadow-cyan-500/50'>
        <nav className='mx-auto max-w-container px-4 sm:px-6 lg:px-8'>
          <div className='relative flex items-center py-6'>
            <div
              className='cursor-pointer mr-auto flex-none text-slate-900'
              onClick={() => {
                navigate('/')
              }}
            >
              Logo
            </div>
            <div className='hidden lg:ml-8 lg:flex lg:items-center lg:border-slate-900/15 lg:pl-8'>
              <a
                onClick={() => {
                  navigate('/create')
                }}
                className='cursor-pointer'
              >
                Create
              </a>

              <a
                onClick={connectWallet}
                className='inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 -my-2.5 ml-8 cursor-pointer'
              >
                <MenuBtn>
                  <span>
                    {account
                      ? account.replace(/^(0x.{4})(.*)(.{4})/, '$1...$3')
                      : 'Connect Wallet'}
                    {!account && <span> →</span>}
                  </span>
                </MenuBtn>
              </a>
            </div>
          </div>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<Lists />} />
        <Route path='/create' element={<Create />} />
        <Route path='/detail' element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App
