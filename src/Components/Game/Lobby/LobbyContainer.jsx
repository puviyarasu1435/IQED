import { Box, Typography } from '@mui/material'
import React from 'react'
import LobbyProfileCard from './LobbyProfileCard'
import { BearIMG, RabbitIMG } from '../../../assets/Image'

const LobbyContainer = () => {
  return (
    <Box sx={{
      width:'60vw',
      height:'100%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column'
    }} >
        <Box sx={{
          width:'100%',
          display:'flex',
          justifyContent:'space-around',
          alignItems:'center'
        }}>
          <LobbyProfileCard Name={"MR_Arch"} Image={RabbitIMG}/>
          <Typography component={"h1"} sx={{fontSize:'100px',fontWeight:'800'}}>
            VS
          </Typography>
          <LobbyProfileCard Name={"Guest"} Image={BearIMG}/>
        </Box>
        <Box>

        </Box>
    </Box>
  )
}

export default LobbyContainer