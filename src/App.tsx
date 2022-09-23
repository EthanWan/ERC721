import { useWeb3React } from '@web3-react/core'
import { useNavigate, Routes, Route } from 'react-router-dom'
import MenuBtn from './components/EMenu'
import Create from './pages/Create'
import Lists from './pages/Lists'
import MyNFTs from './pages/MyNFTs'
import Detail from './pages/Detail'

function App() {
  const { connector, chainId, account, isActive, provider } = useWeb3React()

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
            <div className='hidden lg:ml-8 lg:flex lg:items-center lg:border-slate-900/15 lg:pl-8 text-base'>
              <a
                onClick={() => {
                  navigate('/create')
                }}
                className='cursor-pointer'
              >
                Create
              </a>
              <a
                onClick={() => {
                  navigate('/mynfts')
                }}
                className='cursor-pointer mx-4'
              >
                My NFTs
              </a>
              <a
                onClick={connectWallet}
                className='inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 -my-2.5 cursor-pointer'
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
        <Route path='/mynfts' element={<MyNFTs />} />
        <Route path='/detail' element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App
