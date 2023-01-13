import React from 'react'
import { Outlet } from 'react-router-dom'

const CampaignsLayout = () => {
  return (
    <div>
      <h4>Data will be displayed here</h4>
      <Outlet/>
    </div>
  )
}

export default CampaignsLayout