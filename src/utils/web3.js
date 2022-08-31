import Web3 from 'web3'

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Modern dapp browsers...
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum)
      try {
        // Request account access if needed
        window.ethereum.enable().then(account => {
          console.log('account: ', account)
          // Acccounts now exposed
          resolve(web3)
        })
      } catch (error) {
        reject(error)
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      // Use Mist/MetaMask's provider.
      const web3 = window.web3
      console.log('Injected web3 detected.')
      resolve(web3)
    } else {
      reject(new Error('Install MetaMask first'))
    }
  })

export default {
  getWeb3,
}
