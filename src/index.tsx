import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { hooks as metaMaskHooks, metaMask } from './connectors/metaMask'
import './index.css'
import App from './App'
import Create from './Create'

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, metaMaskHooks]]
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Web3ReactProvider connectors={connectors}>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/create' element={<Create />} />
        </Routes>
      </Web3ReactProvider>
    </BrowserRouter>
  </React.StrictMode>
)
