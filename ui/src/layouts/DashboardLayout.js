import SideNavDrawer from '@components/Drawers/SideNavDrawer'
import DashboardHeader from '@components/Headers/DashboardHeader'
import DashboardNavigation from '@components/Navigation/DashboardNavigation'
import { Box } from '@mui/material'
import React from 'react'

const DashboardLayout = ({ children }) => {
    return (
        <>
            <Box sx={{ display: 'flex', width: '100%' }}>
                <DashboardHeader />
                <SideNavDrawer variant="permanent" open={true} >
                    <Box sx={{ mt: 2 }}>Hello</Box>
                    <DashboardNavigation />
                </SideNavDrawer>
                <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 },mt:'50px' }}>
                    {children}
                </Box>
            </Box>
        </>
    )
}

export default DashboardLayout