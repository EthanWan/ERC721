import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
import { useCallback, useEffect } from 'react'
import useEthers from '../hooks/useEthers'
import ECard from '../components/ECard'
import contractOutput from '../contracts/output/NFTokenMetadataEnumerableMock'

function Lists() {
  // 0x501aC9dbfe9edb740d50038E581f189e89d22e22
  // 0xa34dc5Adf564508739cE33442950dBD5bfd8aA66
  const navigate = useNavigate()
  const { provider } = useEthers()

  const getTokenURI = useCallback(async () => {
    const signer = await provider?.getSigner()
    const contract = new ethers.Contract(
      '0x501aC9dbfe9edb740d50038E581f189e89d22e22',
      contractOutput.abi,
      signer
    )
    const tokenURI = await contract.tokenURI(1)
    return tokenURI
  }, [provider])

  useEffect(() => {
    if (!provider) return
    getTokenURI().then(uri => {
      // metadate:
      // ipfs://bafyreihln4c2qao4esctkpj25xtmhft32f6f5mwqrhjsumcqn7tiatusay/metadata.json
      // {"name":"test","description":"This is test nft","externalLink":"","image":"ipfs://bafybeiewr2z3hivmps5rtxl4pcd3fzugwildwqqrhp6lwkprfguwj7isqq/logo.jpg"}
      console.log(JSON.parse(uri))
    })
  }, [provider, getTokenURI])

  return (
    <>
      <div className='w-full p-3 grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4'>
        <ECard
          onClick={() => {
            navigate('/detail')
          }}
        />
        <ECard />
        <ECard />
        <ECard />
        <ECard />
        <ECard />
      </div>
      {/* <div className='flex justify-center rounded-2xl border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 mx-4'>
        <div className='space-y-1 text-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='mx-auto w-16 h-16 text-gray-400'
          >
            <path
              fillRule='evenodd'
              d='M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z'
              clipRule='evenodd'
            />
            <path d='M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z' />
          </svg>

          <p className='text-gray-500 text-2xl'>No NFT minted</p>
        </div>
      </div> */}
    </>
  )
}

export default Lists
