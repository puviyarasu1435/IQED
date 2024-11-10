import { Box } from '@mui/material'
import React from 'react'
import { ExploreHeader, QuestContainer } from '../../Components'

const ExplorePage = () => {
  return (
    <Box
    sx={{
        width:'100%'
    }}
    >
        <ExploreHeader/>
        <QuestContainer/>
    </Box>
  )
}

export default ExplorePage