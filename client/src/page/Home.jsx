import React from 'react'
import { PageHOC } from '../components'
import { useGlobalContext } from '../context'

const Home = () => {
  const {} = useGlobalContext()
  return (
    <div>
      <h1 className='text-xl text-white'>{}</h1>
    </div>
  )
}

export default PageHOC(
  Home,
  <>Welcome to AVAX Gods <br /> a Web3 NFT CARD GAME</>,
  <>Connect to your wallet to start playing <br /> the ultimate Web3 Battle Card Game</>
)