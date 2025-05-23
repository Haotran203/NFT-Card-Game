import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PageHOC, CustomInput, CustomButton } from '../components'
import { useGlobalContext } from '../context'

const Home = () => {
  const { contract, walletAddress, gameData, setShowAlert, setErrorMessage  } = useGlobalContext()
  const [playerName, setPlayerName] = useState('')
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress)

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName, { gasLimit: 500000 })

        setShowAlert({
          status: true,
          type: 'info',
          message: `${playerName} is being summoned!`,
        })

        setTimeout(() => navigate('/create-battle'), 8000)
      }
    } catch (error) {
      setErrorMessage(error)
    }
  }

    useEffect(() => {
    const checkForPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAddress)
      const playerTokenExists = await contract.isPlayerToken(walletAddress)

      if (playerExists && playerTokenExists) {
        navigate('/create-battle')
      }
    }

    if (contract) checkForPlayerToken()
  }, [contract, walletAddress])

  useEffect(() => {
    if (gameData.activeBattle) {
      navigate(`/battle/${gameData.activeBattle.name}`)
    }
  }, [gameData])
  

  return (
    walletAddress && (
      <div className="flex flex-col">
        <CustomInput
          label="Name"
          placeHolder="Enter your player name"
          value={playerName}
          handleValueChange={setPlayerName}
        />

        <CustomButton
          title="Register"
          handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>
    )
  )
}

export default PageHOC(
  Home,
  <>
    Welcome to Leagend of Runeterra <br /> a Web3 NFT Card Game
  </>,
  <>
    Connect your wallet to start playing <br /> the ultimate Web3 Battle Card Game
  </>
)
