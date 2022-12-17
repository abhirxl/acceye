import { Toolbar } from '@mui/material';
import React from 'react'
import AppBarStyled from './AppBarStyled'
import { useTheme } from '@mui/material/styles';


const DashboardHeader = () => {
    const theme = useTheme();
    const appBar = {
        position: 'fixed',
        color: 'inherit',
        elevation: 0,
        sx: {
            borderBottom: `1px solid ${theme.palette.divider}`
            // boxShadow: theme.customShadows.z1
        }
    };

    const mainHeader = (
        <Toolbar>
            Hello Header
        </Toolbar>
    );
    return (
        <>
            <AppBarStyled open={true} {...appBar}>
                {mainHeader}
            </AppBarStyled>
        </>
    )
}

export default DashboardHeader