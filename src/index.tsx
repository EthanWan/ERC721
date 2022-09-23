import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { Web3EthersProvider } from './hooks/useEthers'
import { hooks as metaMaskHooks, metaMask } from './connectors/metaMask'
import './index.css'
import App from './App'

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, metaMaskHooks]]
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Web3ReactProvider connectors={connectors}>
        <Web3EthersProvider>
          <App />
        </Web3EthersProvider>
      </Web3ReactProvider>
    </BrowserRouter>
  </React.StrictMode>
)
