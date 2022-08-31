import { useState } from 'react'
import Web3 from './utils/web3'

function App() {
  const [address, setAddress] = useState<string | null>(null)
  const connectWallet = async () => {
    Web3.getWeb3().then(web3 => {
      web3.eth.requestAccounts().then((add: string[]) => {
        setAddress(add[0])
      })
    })
  }

  return (
    <header className='relative z-50 w-full flex-none text-sm font-semibold leading-6 text-slate-900'>
      <nav className='mx-auto max-w-container px-4 sm:px-6 lg:px-8'>
        <div className='relative flex items-center py-[2.125rem]'>
          <div className='mr-auto flex-none text-slate-900'>Logo</div>
          <div className='hidden lg:ml-8 lg:flex lg:items-center lg:border-slate-900/15 lg:pl-8'>
            <a href='/create'>Create</a>
            <a
              onClick={connectWallet}
              className='inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 -my-2.5 ml-8 cursor-pointer'
            >
              <span>
                {address ? address : 'Connect Wallet'}
                {!address && <span> →</span>}
              </span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default App
