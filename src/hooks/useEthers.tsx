import { ethers } from 'ethers'
import { createContext, useContext } from 'react'
import type { Web3ContextType } from '@web3-react/core'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider, BaseProvider } from '@ethersproject/providers'

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

/**
 * Web3EthersProvider relpace the common provider with ehters provider
 *
 * TODO: This context Provider can be adapted to various third-party providers
 * with the multiple wallets
 */

export function Web3EthersProvider(props: { children: React.ReactNode }) {
  const { children } = props
  const web3React = useWeb3React()
  let ethersProvider = undefined

  if (web3React && web3React.provider) {
    ethersProvider = new ethers.providers.Web3Provider(web3React.provider.provider)
  }

  return (
    <Web3Context.Provider
      value={{
        ...web3React,
        provider: ethersProvider,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export default function useEthers<
  T extends BaseProvider = Web3Provider
>(): Web3ContextType<T> {
  const context = useContext(Web3Context as React.Context<Web3ContextType<T> | undefined>)
  if (!context)
    throw Error('useEthers can only be used within the Web3ReactProvider component')
  return context
}
